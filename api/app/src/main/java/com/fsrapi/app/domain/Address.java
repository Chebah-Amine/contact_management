package com.fsrapi.app.domain;

public class Address {
    private String country;
    private String street;
    private String city;
    private String zip;

    public Address() {}

    public Address(String country, String street, String city, String zip) {
        this.country = country;
        this.street = street;
        this.city = city;
        this.zip = zip;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

}
