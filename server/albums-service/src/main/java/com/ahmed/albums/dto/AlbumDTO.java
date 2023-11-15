package com.ahmed.albums.dto;

import com.ahmed.albums.entities.Image;
import com.ahmed.albums.entities.Label;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlbumDTO {
    private Long idAlbum;
    private String title;
    private String artist;
    private String genre;
    private Date releaseDate;
    private Label label;
    private Image image;
}
