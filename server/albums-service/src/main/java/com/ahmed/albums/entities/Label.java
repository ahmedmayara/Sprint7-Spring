package com.ahmed.albums.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Label {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long idLabel;

    private String labelName;
    private String labelFounder;
    private String labelCountry;

    @OneToMany(mappedBy = "label")
    @JsonIgnore
    private List<Album> albums;
}
