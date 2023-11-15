package com.ahmed.albums.repos;

import com.ahmed.albums.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
