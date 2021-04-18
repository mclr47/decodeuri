import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-scroll',
//   templateUrl: './scroll.component.html',
//   styleUrls: ['./scroll.component.css']
// })
// export class ScrollComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
// 
import { ActivatedRoute,Router , NavigationEnd, Scroll} from '@angular/router';
import { Component, OnInit , ChangeDetectionStrategy,ChangeDetectorRef,
  ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import {FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY,VirtualScrollStrategy, 
  ScrollDispatcher, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {  Input, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Location, LocationStrategy, PathLocationStrategy, PlatformLocation,
 } from '@angular/common';
 import { filter, map } from 'rxjs/operators'; 


export interface HashExist {
  hashVisible?: boolean;
  hashName?: string;
}



@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: VIRTUAL_SCROLL_STRATEGY,useClass:ScrollDispatcher},Location,
     {provide: LocationStrategy, useClass: PathLocationStrategy}],
   
     
   
})
export class ScrollComponent implements OnInit , AfterViewInit{
  // items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  items = Array.from({length: 11}).map((_, i) => `Item #${i}`);
  //  Position:String = 'start'|'mid'| 'end'
  start=0;
  scrollToPage = ['aaa','bbb','ccc','ddd','eee','fff','ggg','hhh','iii','jjj','kkk'] ;
  activeScrollIndex:Observable<number>;
  activatedRouteFragment = this.activatedRoute.fragment;
  activeFragmentSnapShot;
  windowLocation;
  indexFocus;
  activeFragment$: BehaviorSubject<string> = new BehaviorSubject(window.location.hash.valueOf());
  spyHash: HashExist= { hashVisible: false};   
  spyHashCurrent: HashExist;
  currentElement: string; 

  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport; 
 
  // ************* another way of testing scrolling :
  // @HostListener('window:scroll',['$event']) onScrollEvent($event){
  //   window.onhashchange = this.locationHashChanged;

  constructor(
    private renderer: Renderer2, 
    @Inject(PLATFORM_ID) private platformId: Object,
    public activatedRoute:ActivatedRoute ,
    private router:Router,
    private ref: ChangeDetectorRef,
    private scrollDispatcher:ScrollDispatcher,
    private platformLocation : PlatformLocation,
    private location :Location) { 
     
    }

  ngOnInit(): void {
    this.viewPort.scrollTo({bottom:0});
    // this.viewPort.elementScrolled.apply.
    // this.virtualScrollViewport.scrollIntoView(false);
    this.location.subscribe(loc=>{
      console.log(loc.url);
      console.log(loc.state);
      console.log(loc.type.valueOf())
    })
console.log(decodeURIComponent(this.platformLocation.hash.replace(/^#\/scroll#/, '')))
this.router.events.pipe(filter(element => element instanceof ScrollDispatcher)).subscribe((element: any) => {
  console.log(element.anchor);
//   this.router.events.pipe(
//     filter(event => event instanceof NavigationEnd)
// ).subscribe((ev)=>{console.log(ev.)})
});
  }

  ngAfterViewInit(){
    this.activeScrollIndex = this.viewPort.scrolledIndexChange;
    this.viewPort.scrolledIndexChange.subscribe((index)=>
    {console.log(index);
      // console.log(this.viewPort.getViewportSize());
      // console.log(this.viewPort.getElementRef());
      this.indexFocus = index;

      this.router.navigate(['./scroll'],{fragment:this.scrollToPage[index]});
    
          
        });
       
    // this.ref.detectChanges();
    // this.scrollDispatcher.register(window)
    this.scrollDispatcher.scrolled()
    .subscribe(event => {
      console.log('scrolled........');
      //  console.log(this.getCurrentHash())
      // console.log(this.getCurrentHash())
    });
    // this.scrollDispatcher.ancestorScrolled().subscribe()
   
  }
// *******************

  locationHashChanged(){
  }
  
  funcOnHashChange(){
    console.log('###### changing the hash ##########');
  }
   updateVerticalScroll(event): void {
  }
  // fishing for the active fragment with bellow function has been tried unsuccesfully
 getCurrentHash() {
    return decodeURIComponent(this.platformLocation.hash.replace(/^#\/scroll#/, ''));
  //  this.platformLocation.onHashChange.arguments
  // return this.location.subscribe;
  }

 locationChangeListener(){
   console.log(this.activatedRoute.fragment)
 }
//  ***************** !!!!! IMPORTANT  !!!!!!! ***********************
//  syncWindowToCdk(eventHash:HashExist) ******* has two versions that behave and work differently.
//   Please comment/uncomment both alternatively  to observe functionality;
//  syncWindowToCdk(eventHash:HashExist)
//   {  

//     this.renderer.listen(window, 'scroll', (event) => {
      
//       if (eventHash.hashVisible == true){
//         this.activeFragment$.next(eventHash.hashName);
//             // comment or uncomment the next line to observe the changes***************
//              this.router.navigate(['./scroll'],{fragment:eventHash.hashName });       
//              this.scroll(this.scrollToPage.indexOf(eventHash.hashName));
//     }
//   });
// }
 
 


syncWindowToCdk(eventHash:HashExist)
  {   console.log(eventHash);
    
   if (eventHash.hashVisible == true){
     this.scroll(this.scrollToPage.indexOf(eventHash.hashName));
     this.router.navigate(['./scroll'],{fragment: eventHash.hashName});
   }
 }

//  routerLinkActiveScroll(index){
//    this.scroll(index);
//  }
  scroll(position) {
   
    // this.viewPort.scrollToIndex(position, 'auto');
    this.viewPort.scrollToIndex(position,'smooth');
  }



}











