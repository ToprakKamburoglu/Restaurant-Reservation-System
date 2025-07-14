package com.example.rrsystem.Entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "customer", schema = "restaurant-reservation-system")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "c_user_id", referencedColumnName = "user_id")
    private UserInfo user;

    @ManyToOne
    @JoinColumn(name = "c_restaurant_id", referencedColumnName = "restaurant_id")
    private RestaurantInfo restaurant;

    @ManyToOne
    @JoinColumn(name = "active_payment", referencedColumnName = "payment_id")
    private Payment payment;

    @Column(name = "api_key", unique = true, nullable = false, length = 64)
    private String apiKey;

    public RestaurantInfo getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(RestaurantInfo restaurant) {
        this.restaurant = restaurant;
    }

    public UserInfo getUser() {
        return user;
    }

    public void setUser(UserInfo user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserInfo getUserInfo() {
        return user;
    }

    public void setUserInfo(UserInfo user) {
        this.user = user;
    }

    public RestaurantInfo getRestaurantInfo() {
        return restaurant;
    }

    public void setRestaurantInfo(RestaurantInfo restaurant) {
        this.restaurant = restaurant;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

}
