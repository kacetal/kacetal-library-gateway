package com.kacetal.library.gateway.service.impl;

import com.kacetal.library.gateway.domain.UserSettings;
import com.kacetal.library.gateway.repository.UserRepository;
import com.kacetal.library.gateway.repository.UserSettingsRepository;
import com.kacetal.library.gateway.service.UserSettingsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link UserSettings}.
 */
@Service
@Transactional
public class UserSettingsServiceImpl implements UserSettingsService {

    private final Logger log = LoggerFactory.getLogger(UserSettingsServiceImpl.class);

    private final UserSettingsRepository userSettingsRepository;

    private final UserRepository userRepository;

    public UserSettingsServiceImpl(UserSettingsRepository userSettingsRepository, UserRepository userRepository) {
        this.userSettingsRepository = userSettingsRepository;
        this.userRepository = userRepository;
    }

    /**
     * Save a userSettings.
     *
     * @param userSettings the entity to save.
     * @return the persisted entity.
     */
    @Override
    public UserSettings save(UserSettings userSettings) {
        log.debug("Request to save UserSettings : {}", userSettings);
        long userId = userSettings.getUser().getId();
        userRepository.findById(userId).ifPresent(userSettings::setUser);
        return userSettingsRepository.save(userSettings);
    }

    /**
     * Get all the userSettings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<UserSettings> findAll(Pageable pageable) {
        log.debug("Request to get all UserSettings");
        return userSettingsRepository.findAll(pageable);
    }

    /**
     * Get all the userSettings with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<UserSettings> findAllWithEagerRelationships(Pageable pageable) {
        return userSettingsRepository.findAllWithEagerRelationships(pageable);
    }


    /**
     * Get one userSettings by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UserSettings> findOne(Long id) {
        log.debug("Request to get UserSettings : {}", id);
        return userSettingsRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the userSettings by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserSettings : {}", id);
        userSettingsRepository.deleteById(id);
    }
}
