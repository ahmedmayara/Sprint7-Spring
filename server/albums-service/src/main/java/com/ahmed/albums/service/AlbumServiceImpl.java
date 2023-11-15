package com.ahmed.albums.service;

import com.ahmed.albums.dto.AlbumDTO;
import com.ahmed.albums.entities.Album;
import com.ahmed.albums.entities.Label;
import com.ahmed.albums.repos.AlbumRepository;
import com.ahmed.albums.repos.ImageRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MatchingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlbumServiceImpl implements AlbumService {
    @Autowired
    AlbumRepository albumRepository;
    @Autowired
    ImageRepository imageRepository;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public AlbumDTO saveAlbum(AlbumDTO a) {
        return convertEntityToDTO(albumRepository.save(convertDTOToEntity(a)));
    }

    @Override
    public AlbumDTO updateAlbum(AlbumDTO a) {
        Long oldImageId = this.getAlbum(a.getIdAlbum()).getImage().getIdImage();
        Long newImageId = a.getImage().getIdImage();
        Album albumUpdated = albumRepository.save(convertDTOToEntity(a));
        if (oldImageId != newImageId) {
            imageRepository.deleteById(oldImageId);
        }
        return convertEntityToDTO(albumUpdated);
    }

    @Override
    public void deleteAlbum(Album a) {
        albumRepository.delete(a);
    }

    @Override
    public void deleteAlbumById(Long id) {
        albumRepository.deleteById(id);
    }

    @Override
    public AlbumDTO getAlbum(Long id) {
        return convertEntityToDTO(albumRepository.findById(id).get());
    }

    @Override
    public List<AlbumDTO> getAllAlbums() {
        return albumRepository.findAll().stream().map(this::convertEntityToDTO).collect(Collectors.toList());
    }

    // Methods From AlbumRepository

    @Override
    public List<Album> findByTitle(String title) {
        return albumRepository.findByTitle(title);
    }

    @Override
    public List<Album> findByTitleContains(String title) {
        return albumRepository.findByTitleContains(title);
    }

    @Override
    public List<Album> findByGenre(String genre) {
        return albumRepository.findByGenre(genre);
    }

    @Override
    public List<Album> findByLabel(Label label) {
        return albumRepository.findByLabel(label);
    }

    @Override
    public List<Album> findByLabelIdLabel(Long id) {
        return albumRepository.findByLabelIdLabel(id);
    }

    @Override
    public List<Album> findByOrderByTitleAsc() {
        return albumRepository.findByOrderByTitleAsc();
    }

    @Override
    public List<Album> sortByTitleAndGenre() {
        return albumRepository.sortByTitleAndGenre();
    }

    @Override
    public AlbumDTO convertEntityToDTO(Album a) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        AlbumDTO albumDTO = modelMapper.map(a, AlbumDTO.class);
        return albumDTO;
    }

    @Override
    public Album convertDTOToEntity(AlbumDTO a) {
        Album album = new Album();
        album = modelMapper.map(a, Album.class);
        return album;
    }
}

