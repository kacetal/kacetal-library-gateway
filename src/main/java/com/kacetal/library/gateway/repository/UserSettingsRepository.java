package com.kacetal.library.gateway.repository;

import com.kacetal.library.gateway.domain.UserSettings;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the UserSettings entity.
 */
@Repository
public interface UserSettingsRepository extends JpaRepository<UserSettings, Long> {

    @Query(value = "select distinct userSettings from UserSettings userSettings left join fetch userSettings.addresses",
        countQuery = "select count(distinct userSettings) from UserSettings userSettings")
    Page<UserSettings> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct userSettings from UserSettings userSettings left join fetch userSettings.addresses")
    List<UserSettings> findAllWithEagerRelationships();

    @Query("select userSettings from UserSettings userSettings left join fetch userSettings.addresses where userSettings.id =:id")
    Optional<UserSettings> findOneWithEagerRelationships(@Param("id") Long id);

}
