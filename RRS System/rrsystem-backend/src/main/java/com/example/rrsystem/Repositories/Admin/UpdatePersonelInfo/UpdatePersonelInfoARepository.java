package com.example.rrsystem.Repositories.Admin.UpdatePersonelInfo;

import com.example.rrsystem.Entities.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UpdatePersonelInfoARepository extends JpaRepository<UserInfo, Long> {
    @Query("SELECT u FROM UserInfo u WHERE u.username = :username")
    UserInfo findByUsername(String username);

    @Query("SELECT u FROM UserInfo u WHERE u.username = :username AND u.id != :userId")
    UserInfo findByUsernameExceptCurrentUser(String username, Long userId);


}
