package com.ahmed.albums.service;

import com.ahmed.albums.dto.AlbumDTO;
import com.ahmed.albums.entities.Album;
import com.ahmed.albums.entities.Label;

import java.util.List;

public interface AlbumService {
    AlbumDTO saveAlbum(AlbumDTO a);
    AlbumDTO updateAlbum(AlbumDTO a);
    void deleteAlbum(Album a);
    void deleteAlbumById(Long id);
    AlbumDTO getAlbum(Long id);
    List<AlbumDTO> getAllAlbums();
    List<Album> findByTitle(String title);
    List<Album> findByTitleContains(String title);
    List<Album> findByGenre(String genre);
    List<Album> findByLabel(Label label);
    List<Album> findByLabelIdLabel(Long id);
    List<Album> findByOrderByTitleAsc();
    List<Album> sortByTitleAndGenre();
    AlbumDTO convertEntityToDTO(Album a);
    Album convertDTOToEntity(AlbumDTO a);
}
