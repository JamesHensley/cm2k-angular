import {
    Component,
    Inject,
    OnInit,
    ViewChild,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    OnDestroy,
    Query
} from "@angular/core";
import { IConnection } from "src/app/interfaces/IConnection";

@Component({
    selector: 'block-edge-mgr',
    templateUrl: './block-edge-mgr.html',
    styleUrls: ['./blockprops.scss']
})
export class BlockEdgeMgr implements OnInit {
    @Input() connections: Array<IConnection>;
    @Input() side: string;

    ngOnInit(): void {
        console.log('BlockEdgeMgr->ngOnInit');
    }
}