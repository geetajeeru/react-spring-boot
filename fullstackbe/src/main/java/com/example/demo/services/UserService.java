package com.example.demo.services;

import com.example.demo.domain.User;
import com.example.demo.exceptions.UsernameAlreadyExistsException;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User svaUser(User user) {
        try {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            user.setUsername(user.getUsername());
            return userRepository.save(user);
        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '"+user.getUsername()+"' already exists");
        }
    }
}
