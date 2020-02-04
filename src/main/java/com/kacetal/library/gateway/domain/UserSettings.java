package com.kacetal.library.gateway.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A UserSettings.
 */
@Getter
@Setter
@ToString
@Entity
@Table(name = "user_settings")
public class UserSettings implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Lob
    @Column(name = "avatar")
    private byte[] avatar;

    @Column(name = "avatar_content_type")
    private String avatarContentType;

    @Size(max = 15)
    @Column(name = "mobile_phone", length = 15)
    private String mobilePhone;

    @Column(name = "borrow_limit")
    private Integer borrowLimit;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    @ManyToMany
    @JoinTable(name = "user_settings_addresses",
        joinColumns = @JoinColumn(name = "user_settings_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "addresses_id", referencedColumnName = "id"))
    @JsonIgnoreProperties("userSettings")
    private Set<Address> addresses = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserSettings)) {
            return false;
        }
        return id != null && id.equals(((UserSettings) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }
}
