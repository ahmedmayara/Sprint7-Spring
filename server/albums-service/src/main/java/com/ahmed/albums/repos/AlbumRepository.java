package com.ahmed.albums.repos;

import com.ahmed.albums.entities.Album;
import com.ahmed.albums.entities.Label;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource (path = "rest")
public interface AlbumRepository extends JpaRepository<Album, Long> {
    List<Album> findByTitle(String title);
    List<Album> findByTitleContains(String title);

    @Query("select a from Album a where a.genre like %?1")
    List<Album> findByGenre(String genre);

    @Query("select a from Album a where a.label = ?1")
    List<Album> findByLabel(Label label);

    List<Album> findByLabelIdLabel(Long id);

    List<Album> findByOrderByTitleAsc();

    @Query ("select a from Album a order by a.title asc, a.genre desc")
    List<Album> sortByTitleAndGenre();

}
