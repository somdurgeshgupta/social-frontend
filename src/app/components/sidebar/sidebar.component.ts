import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {GLOBAL} from '../../services/global';
import {Publication} from '../../models/publication';
import {UploadService} from '../../services/upload.service';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    providers: [UserService, UploadService]
})
export class SidebarComponent implements OnInit {
    public url;
    public identity;
    public token;
    public stats;
    public status;
    public publication: Publication;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _uploadService: UploadService
    ) {
        this.url = GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats();
        this.publication = new Publication("", "", "", "", this.identity._id);
    }

    ngOnInit() {
        console.log('[OK] Component: sidebar.');
        this.getCounter(this.identity._id);
    }

    getCounter(id) {
        this._userService.getCounter(id).subscribe(
            response => {
                this.stats = response;
            },
            error => {
                console.log(<any>error);
            }
        );
    }


    @Output() sended = new EventEmitter();

    sendPublication(event) {
        this.sended.emit({send:'true'});
    }

    public filesToUpload: Array<File>;

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}
