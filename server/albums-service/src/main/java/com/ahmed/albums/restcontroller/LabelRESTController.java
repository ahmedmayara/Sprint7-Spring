package com.ahmed.albums.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ahmed.albums.entities.Label;
import com.ahmed.albums.repos.LabelRepository;

@RestController
@RequestMapping("/api/labels")
@CrossOrigin("*")
public class LabelRESTController {
    @Autowired
    LabelRepository labelRepository;

    @RequestMapping(value = "/allLabels", method = RequestMethod.GET)
    public List<Label> getAllLabels () {
        return labelRepository.findAll();
    }

    @RequestMapping(value = "/addLabel", method = RequestMethod.POST)
    public Label createLabel (@RequestBody Label label) {
        return labelRepository.save(label);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Label getLabelByID (@PathVariable("id") Long id) {
        return labelRepository.findById(id).get();
    }
}
