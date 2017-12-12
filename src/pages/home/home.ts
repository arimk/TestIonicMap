import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';

/**
 * Generated class for the AnnuairePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  map: GoogleMap;
  mapElement: HTMLElement;
  notificationsCount: number;
  messagesCount: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController, private googleMaps: GoogleMaps, public events: Events) {
   
  
    events.subscribe('messages_unread', (messagesCount) => {
      this.messagesCount = messagesCount;
      console.log(messagesCount);
  });
  
  
  }


  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    this.mapElement = document.getElementById('map');

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 46.379933,
          lng: 2.8374617
        },
        zoom: 5
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      console.log('Map is ready!');
      let response = [
        {
            "club_name": "angers",
            "club_id": 48,
            "total_members_count": 1,
            "lat": 47.580497,
            "lng": -0.275269,
            "next_event": null
        },
        {
            "club_name": "bordeaux",
            "club_id": 47,
            "total_members_count": 1,
            "lat": 44.8387441,
            "lng": -0.5724323,
            "next_event": null
        }
      ];
        response.forEach((club) => {
          let icon = "www/assets/imgs/carbao_map_club_icon3.png";
           if  (club.total_members_count < 12) {
              icon = "www/assets/imgs/carbao_map_club_icon2.png";

           }

           if  (club.total_members_count < 6) {
            icon = "www/assets/imgs/carbao_map_club_icon1.png";

          }
          
          this.map.addMarker({
            title: club.club_name,
            icon: {
              url: icon,
            size: {
              width: 20,
              height: 24
              }
            },
            animation: 'DROP',
            position: {
              lat: club.lat,
              lng: club.lng
            },
            
          },
        
        )
          .then( (marker: Marker) => {
            //console.log(marker);
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                console.log("CLICK");
                
              });

             });
       
      
      });
      

    });
}


 }
