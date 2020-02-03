package com.kacetal.library.gateway.service;

import com.kacetal.library.gateway.domain.UserSettings;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link UserSettings}.
 */
public interface UserSettingsService {

    /**
     * Save a userSettings.
     *
     * @param userSettings the entity to save.
     * @return the persisted entity.
     */
    UserSettings save(UserSettings userSettings);

    /**
     * Get all the userSettings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<UserSettings> findAll(Pageable pageable);

    /**
     * Get all the userSettings with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<UserSettings> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" userSettings.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserSettings> findOne(Long id);

    /**
     * Delete the "id" userSettings.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
