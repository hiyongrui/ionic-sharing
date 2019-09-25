import { Component } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private file: File, private fileSystem: File, private toastCtrl: ToastController, private camera: Camera, private http: HttpClient, private nativehttp: HTTP) {
    this.http.get("assets/sampledata.json").subscribe(data => {
      console.warn(data);
    })
  }

  exportJSON() {
    let json = {
      "fruit": "Apple",
      "size": "Large",
      "color": "Red"
    }
    // console.warn(json); 
    let path = this.fileSystem.externalRootDirectory + '/Download/'; // for Android https://stackoverflow.com/questions/49051139/saving-file-to-downloads-directory-using-ionic-3
    this.file.writeFile(path, 'sampleionicfile.json', JSON.stringify(json), {replace:true}).then(() => {
      this.presentToastWithOptions("json file exported!!");      
      this.readFile();
    }, (err) => this.presentToastWithOptions("Sorry error" + err));
  }

  async presentToastWithOptions(text) {
    const toast = await this.toastCtrl.create({
      header: text,
      duration: 3000,
      position: 'bottom',
      buttons: [{
        text: 'CLOSE',
        role: 'cancel'
      }]
    });
    toast.present();
  }

  async readFile() {
    let path = this.fileSystem.externalRootDirectory + '/Download/'; // for Android
    // this.file.readAsText(path, 'sampleionicfile.json').then(val => {
    //   console.error(val);
    // })
    // this.http.get(path).subscribe(data => {
    //   console.error(data);
    // })
  }
  
    
  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
      // this.imageURI = imageData;
      console.warn("image data", imageData);
    }, (err) => {
      console.log("err", err);
      // this.presentToast(err);
    });
  }

}
