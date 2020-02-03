package com.kacetal.library.gateway.web.rest;

import com.kacetal.library.gateway.domain.UserSettings;
import com.kacetal.library.gateway.service.UserSettingsService;
import com.kacetal.library.gateway.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * REST controller for managing {@link com.kacetal.library.gateway.domain.UserSettings}.
 */
@RestController
@RequestMapping("/api")
public class UserSettingsResource {

    private static final String ENTITY_NAME = "userSettings";
    private final Logger log = LoggerFactory.getLogger(UserSettingsResource.class);
    private final UserSettingsService userSettingsService;
    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public UserSettingsResource(UserSettingsService userSettingsService) {
        this.userSettingsService = userSettingsService;
    }

    /**
     * {@code POST  /user-settings} : Create a new userSettings.
     *
     * @param userSettings the userSettings to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userSettings, or with status {@code 400 (Bad Request)} if the userSettings has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-settings")
    public ResponseEntity<UserSettings> createUserSettings(@Valid @RequestBody UserSettings userSettings) throws URISyntaxException {
        log.debug("REST request to save UserSettings : {}", userSettings);
        if (userSettings.getId() != null) {
            throw new BadRequestAlertException("A new userSettings cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (Objects.isNull(userSettings.getUser())) {
            throw new BadRequestAlertException("Invalid association value provided", ENTITY_NAME, "null");
        }
        UserSettings result = userSettingsService.save(userSettings);
        return ResponseEntity.created(new URI("/api/user-settings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-settings} : Updates an existing userSettings.
     *
     * @param userSettings the userSettings to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userSettings,
     * or with status {@code 400 (Bad Request)} if the userSettings is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userSettings couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-settings")
    public ResponseEntity<UserSettings> updateUserSettings(@Valid @RequestBody UserSettings userSettings) throws URISyntaxException {
        log.debug("REST request to update UserSettings : {}", userSettings);
        if (userSettings.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserSettings result = userSettingsService.save(userSettings);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userSettings.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-settings} : get all the userSettings.
     *
     * @param pageable  the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userSettings in body.
     */
    @GetMapping("/user-settings")
    public ResponseEntity<List<UserSettings>> getAllUserSettings(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of UserSettings");
        Page<UserSettings> page;
        if (eagerload) {
            page = userSettingsService.findAllWithEagerRelationships(pageable);
        } else {
            page = userSettingsService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /user-settings/:id} : get the "id" userSettings.
     *
     * @param id the id of the userSettings to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userSettings, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-settings/{id}")
    public ResponseEntity<UserSettings> getUserSettings(@PathVariable Long id) {
        log.debug("REST request to get UserSettings : {}", id);
        Optional<UserSettings> userSettings = userSettingsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userSettings);
    }

    /**
     * {@code DELETE  /user-settings/:id} : delete the "id" userSettings.
     *
     * @param id the id of the userSettings to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-settings/{id}")
    public ResponseEntity<Void> deleteUserSettings(@PathVariable Long id) {
        log.debug("REST request to delete UserSettings : {}", id);
        userSettingsService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
