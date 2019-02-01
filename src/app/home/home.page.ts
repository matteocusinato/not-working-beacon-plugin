import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import { IBeacon } from '@ionic-native/ibeacon/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  constructor(private ibeacon: IBeacon, private platform: Platform) {}


  async ngOnInit() {
    await this.platform.ready();
    await this.loadBeacons();
  }


  async loadBeacons () {
    // Request permission to use location on iOS
    await this.ibeacon.requestAlwaysAuthorization();
    // create a new delegate and register it with the native layer
    const delegate = this.ibeacon.Delegate();

    // Subscribe to some of the delegate's event handlers
    delegate.didRangeBeaconsInRegion()
        .subscribe(
            data => console.log('didRangeBeaconsInRegion: ', data),
            error => console.error()
        );
    delegate.didStartMonitoringForRegion()
        .subscribe(
            data => console.log('didStartMonitoringForRegion: ', data),
            error => console.error()
        );
    delegate.didEnterRegion()
        .subscribe(
            data => {
              console.log('didEnterRegion: ', data);
            }
        );

    const beaconRegion = this.ibeacon.BeaconRegion('beacon', 'BBBC1A32-E453-4A97-9880-F5A8A67EB1F5');

    this.ibeacon.startMonitoringForRegion(beaconRegion)
        .then(
            () => console.log('Native layer received the request to monitoring'),
            error => console.error('Native layer failed to begin monitoring: ', error));
  }
}
