package com.kacetal.library.gateway.web.rest;

import com.kacetal.library.gateway.KacetalLibraryGatewayApp;
import com.kacetal.library.gateway.domain.UserSettings;
import com.kacetal.library.gateway.domain.User;
import com.kacetal.library.gateway.repository.UserSettingsRepository;
import com.kacetal.library.gateway.service.UserSettingsService;
import com.kacetal.library.gateway.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.kacetal.library.gateway.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link UserSettingsResource} REST controller.
 */
@SpringBootTest(classes = KacetalLibraryGatewayApp.class)
public class UserSettingsResourceIT {

    private static final byte[] DEFAULT_AVATAR = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_AVATAR = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_AVATAR_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_AVATAR_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_MOBILE_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE_PHONE = "BBBBBBBBBB";

    private static final Integer DEFAULT_BORROW_LIMIT = 1;
    private static final Integer UPDATED_BORROW_LIMIT = 2;

    @Autowired
    private UserSettingsRepository userSettingsRepository;

    @Mock
    private UserSettingsRepository userSettingsRepositoryMock;

    @Mock
    private UserSettingsService userSettingsServiceMock;

    @Autowired
    private UserSettingsService userSettingsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restUserSettingsMockMvc;

    private UserSettings userSettings;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserSettingsResource userSettingsResource = new UserSettingsResource(userSettingsService);
        this.restUserSettingsMockMvc = MockMvcBuilders.standaloneSetup(userSettingsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserSettings createEntity(EntityManager em) {
        UserSettings userSettings = new UserSettings();
        userSettings.setAvatar(DEFAULT_AVATAR);
        userSettings.setAvatarContentType(DEFAULT_AVATAR_CONTENT_TYPE);
        userSettings.setMobilePhone(DEFAULT_MOBILE_PHONE);
        userSettings.setBorrowLimit(DEFAULT_BORROW_LIMIT);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        userSettings.setUser(user);
        return userSettings;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserSettings createUpdatedEntity(EntityManager em) {
        UserSettings userSettings = new UserSettings();
        userSettings.setAvatar(UPDATED_AVATAR);
        userSettings.setAvatarContentType(UPDATED_AVATAR_CONTENT_TYPE);
        userSettings.setMobilePhone(UPDATED_MOBILE_PHONE);
        userSettings.setBorrowLimit(UPDATED_BORROW_LIMIT);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        userSettings.setUser(user);
        return userSettings;
    }

    @BeforeEach
    public void initTest() {
        userSettings = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserSettings() throws Exception {
        int databaseSizeBeforeCreate = userSettingsRepository.findAll().size();

        // Create the UserSettings
        restUserSettingsMockMvc.perform(post("/api/user-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSettings)))
            .andExpect(status().isCreated());

        // Validate the UserSettings in the database
        List<UserSettings> userSettingsList = userSettingsRepository.findAll();
        assertThat(userSettingsList).hasSize(databaseSizeBeforeCreate + 1);
        UserSettings testUserSettings = userSettingsList.get(userSettingsList.size() - 1);
        assertThat(testUserSettings.getAvatar()).isEqualTo(DEFAULT_AVATAR);
        assertThat(testUserSettings.getAvatarContentType()).isEqualTo(DEFAULT_AVATAR_CONTENT_TYPE);
        assertThat(testUserSettings.getMobilePhone()).isEqualTo(DEFAULT_MOBILE_PHONE);
        assertThat(testUserSettings.getBorrowLimit()).isEqualTo(DEFAULT_BORROW_LIMIT);

        // Validate the id for MapsId, the ids must be same
        assertThat(testUserSettings.getId()).isEqualTo(testUserSettings.getUser().getId());
    }

    @Test
    @Transactional
    public void createUserSettingsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userSettingsRepository.findAll().size();

        // Create the UserSettings with an existing ID
        userSettings.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserSettingsMockMvc.perform(post("/api/user-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSettings)))
            .andExpect(status().isBadRequest());

        // Validate the UserSettings in the database
        List<UserSettings> userSettingsList = userSettingsRepository.findAll();
        assertThat(userSettingsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void updateUserSettingsMapsIdAssociationWithNewId() throws Exception {
        // Initialize the database
        userSettingsService.save(userSettings);
        int databaseSizeBeforeCreate = userSettingsRepository.findAll().size();

        // Add a new parent entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();

        // Load the userSettings
        UserSettings updatedUserSettings = userSettingsRepository.findById(userSettings.getId()).get();
        // Disconnect from session so that the updates on updatedUserSettings are not directly saved in db
        em.detach(updatedUserSettings);

        // Update the User with new association value
        updatedUserSettings.setUser(user);

        // Update the entity
        restUserSettingsMockMvc.perform(put("/api/user-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserSettings)))
            .andExpect(status().isOk());

        // Validate the UserSettings in the database
        List<UserSettings> userSettingsList = userSettingsRepository.findAll();
        assertThat(userSettingsList).hasSize(databaseSizeBeforeCreate);
        UserSettings testUserSettings = userSettingsList.get(userSettingsList.size() - 1);

        // Validate the id for MapsId, the ids must be same
        // Uncomment the following line for assertion. However, please note that there is a known issue and uncommenting will fail the test.
        // Please look at https://github.com/jhipster/generator-jhipster/issues/9100. You can modify this test as necessary.
        // assertThat(testUserSettings.getId()).isEqualTo(testUserSettings.getUser().getId());
    }

    @Test
    @Transactional
    public void getAllUserSettings() throws Exception {
        // Initialize the database
        userSettingsRepository.saveAndFlush(userSettings);

        // Get all the userSettingsList
        restUserSettingsMockMvc.perform(get("/api/user-settings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userSettings.getId().intValue())))
            .andExpect(jsonPath("$.[*].avatarContentType").value(hasItem(DEFAULT_AVATAR_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].avatar").value(hasItem(Base64Utils.encodeToString(DEFAULT_AVATAR))))
            .andExpect(jsonPath("$.[*].mobilePhone").value(hasItem(DEFAULT_MOBILE_PHONE)))
            .andExpect(jsonPath("$.[*].borrowLimit").value(hasItem(DEFAULT_BORROW_LIMIT)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllUserSettingsWithEagerRelationshipsIsEnabled() throws Exception {
        UserSettingsResource userSettingsResource = new UserSettingsResource(userSettingsServiceMock);
        when(userSettingsServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restUserSettingsMockMvc = MockMvcBuilders.standaloneSetup(userSettingsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restUserSettingsMockMvc.perform(get("/api/user-settings?eagerload=true"))
        .andExpect(status().isOk());

        verify(userSettingsServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllUserSettingsWithEagerRelationshipsIsNotEnabled() throws Exception {
        UserSettingsResource userSettingsResource = new UserSettingsResource(userSettingsServiceMock);
            when(userSettingsServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restUserSettingsMockMvc = MockMvcBuilders.standaloneSetup(userSettingsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restUserSettingsMockMvc.perform(get("/api/user-settings?eagerload=true"))
        .andExpect(status().isOk());

            verify(userSettingsServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getUserSettings() throws Exception {
        // Initialize the database
        userSettingsRepository.saveAndFlush(userSettings);

        // Get the userSettings
        restUserSettingsMockMvc.perform(get("/api/user-settings/{id}", userSettings.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userSettings.getId().intValue()))
            .andExpect(jsonPath("$.avatarContentType").value(DEFAULT_AVATAR_CONTENT_TYPE))
            .andExpect(jsonPath("$.avatar").value(Base64Utils.encodeToString(DEFAULT_AVATAR)))
            .andExpect(jsonPath("$.mobilePhone").value(DEFAULT_MOBILE_PHONE))
            .andExpect(jsonPath("$.borrowLimit").value(DEFAULT_BORROW_LIMIT));
    }

    @Test
    @Transactional
    public void getNonExistingUserSettings() throws Exception {
        // Get the userSettings
        restUserSettingsMockMvc.perform(get("/api/user-settings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserSettings() throws Exception {
        // Initialize the database
        userSettingsService.save(userSettings);

        int databaseSizeBeforeUpdate = userSettingsRepository.findAll().size();

        // Update the userSettings
        UserSettings updatedUserSettings = userSettingsRepository.findById(userSettings.getId()).get();
        // Disconnect from session so that the updates on updatedUserSettings are not directly saved in db
        em.detach(updatedUserSettings);
        updatedUserSettings.setAvatar(UPDATED_AVATAR);
        updatedUserSettings.setAvatarContentType(UPDATED_AVATAR_CONTENT_TYPE);
        updatedUserSettings.setMobilePhone(UPDATED_MOBILE_PHONE);
        updatedUserSettings.setBorrowLimit(UPDATED_BORROW_LIMIT);

        restUserSettingsMockMvc.perform(put("/api/user-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserSettings)))
            .andExpect(status().isOk());

        // Validate the UserSettings in the database
        List<UserSettings> userSettingsList = userSettingsRepository.findAll();
        assertThat(userSettingsList).hasSize(databaseSizeBeforeUpdate);
        UserSettings testUserSettings = userSettingsList.get(userSettingsList.size() - 1);
        assertThat(testUserSettings.getAvatar()).isEqualTo(UPDATED_AVATAR);
        assertThat(testUserSettings.getAvatarContentType()).isEqualTo(UPDATED_AVATAR_CONTENT_TYPE);
        assertThat(testUserSettings.getMobilePhone()).isEqualTo(UPDATED_MOBILE_PHONE);
        assertThat(testUserSettings.getBorrowLimit()).isEqualTo(UPDATED_BORROW_LIMIT);
    }

    @Test
    @Transactional
    public void updateNonExistingUserSettings() throws Exception {
        int databaseSizeBeforeUpdate = userSettingsRepository.findAll().size();

        // Create the UserSettings

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserSettingsMockMvc.perform(put("/api/user-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSettings)))
            .andExpect(status().isBadRequest());

        // Validate the UserSettings in the database
        List<UserSettings> userSettingsList = userSettingsRepository.findAll();
        assertThat(userSettingsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserSettings() throws Exception {
        // Initialize the database
        userSettingsService.save(userSettings);

        int databaseSizeBeforeDelete = userSettingsRepository.findAll().size();

        // Delete the userSettings
        restUserSettingsMockMvc.perform(delete("/api/user-settings/{id}", userSettings.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserSettings> userSettingsList = userSettingsRepository.findAll();
        assertThat(userSettingsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
