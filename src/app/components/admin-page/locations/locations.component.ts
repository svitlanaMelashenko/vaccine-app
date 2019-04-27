import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../../../services/locations.service';
import { Marker } from '../../../models/marker';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  locations: Marker[];
  editState: boolean = false;
  locationToEdit: Marker;

  constructor(
    private locationsService: LocationsService
  ) { }

  ngOnInit() {
    // this.locations = this.locationsService.getMarkers();
    this.locationsService.getMarkers().subscribe(locations =>
      this.locations = locations
    )
  }

  deleteLocation(location) {
    this.cancelEditing();
    this.locationsService.deleteMarker(location);

  }
  editLocation(location) {
    this.editState = true;
    this.locationToEdit = location;

  }
  updateLocation(location) {
    this.locationsService.updateMarker(location);
    this.cancelEditing();
  }
  cancelEditing() {
    this.editState = false;
    this.locationToEdit = null;
  }
}