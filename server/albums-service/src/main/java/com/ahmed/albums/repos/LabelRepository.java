package com.ahmed.albums.repos;

import com.ahmed.albums.entities.Label;
import org.springframework.data.jpa.repository.JpaRepository;
public interface LabelRepository extends JpaRepository<Label, Long> {

}
