package com.lukaszfabia.main.controller;

import com.lukaszfabia.main.dto.UserDTO;
import com.lukaszfabia.main.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller()
public class LoginController {

    private UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public String login(@RequestParam(value = "logout", required = false) String logout, Model model) {
        model.addAttribute("userDTO", new UserDTO());

        model.addAttribute("body", "login");

        if (logout != null) {
            model.addAttribute("logoutMessage", "Wylogowano pomyślnie");
        }

        return "layout/start_layout";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }
}
