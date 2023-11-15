package com.ahmed.albums.restcontroller;

import com.ahmed.albums.dto.AlbumDTO;
import com.ahmed.albums.entities.Album;
import com.ahmed.albums.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AlbumRESTController {
    @Autowired
    AlbumService albumService;

    @RequestMapping(value = "/allAlbums", method = RequestMethod.GET)
    public List<AlbumDTO> getAllAlbums() {
        return albumService.getAllAlbums();
    }

    @RequestMapping(value = "/album/{id}", method = RequestMethod.GET)
    public AlbumDTO getAlbumById(@PathVariable("id") Long id) {
        return albumService.getAlbum(id);
    }

    @RequestMapping(path = "addAlbum", method = RequestMethod.POST)
    public AlbumDTO createAlbum(@RequestBody AlbumDTO a) {
        return albumService.saveAlbum(a);
    }

    @RequestMapping(path = "/updateAlbum", method = RequestMethod.PUT)
    public AlbumDTO updateAlbum(@RequestBody AlbumDTO a) {
        return albumService.updateAlbum(a);
    }

    @RequestMapping(value = "/deleteAlbum/{id}", method = RequestMethod.DELETE)
    public void deleteAlbum(@PathVariable("id") Long id) {
        albumService.deleteAlbumById(id);
    }

    @RequestMapping(value = "/label/{idLabel}", method = RequestMethod.GET)
    public List<Album> getAlbumsByLabel(@PathVariable("idLabel") Long idLabel) {
        return albumService.findByLabelIdLabel(idLabel);
    }
}
