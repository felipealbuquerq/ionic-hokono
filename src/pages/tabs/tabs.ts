import { Component } from '@angular/core';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'SearchPage';
  tab3Root = 'CameraPage';
  tab4Root = 'FollowingPage';
  tab5Root = 'ProfilePage';

  profilePageBadges: number = 0;

  constructor(
    private firebase: FirebaseProvider
  ) {
    this.firebase.getMyChats()
      .subscribe(chats => {
        if (chats.length) {
          console.log('chats', Object.entries(Object.entries(chats[0])));
        }
      })
  }
}
