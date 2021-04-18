import { Directive, ChangeDetectionStrategy,ChangeDetectorRef, 
  ElementRef, Input,
  HostListener} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy, PlatformLocation,
} from '@angular/common';
import {Router,ActivatedRouteSnapshot, ActivatedRoute} from '@angular/router';

@Directive({
  selector: '[appHashActive]',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // {provide: VIRTUAL_SCROLL_STRATEGY,useClass:ScrollDispatcher},
    Location,
     {provide: LocationStrategy, useClass: PathLocationStrategy}],
})
export class HashActiveDirective {


  scrollToPage = ['aaa','bbb','ccc','ddd','eee','fff','ggg','hhh','iii','jjj','kkk'] ;
  // The input  <<<elem id>>> can be taken out since can be identified as (this.el.nativeElement as HTMLElement).id 
  @Input() idexToc: string; 

  // @Output() inFocusViewEventEmitter = new EventEmitter(); 
  // constructor(private el:ElementRef, private router:Router,
  //   private activatedRoute:ActivatedRoute) {
  //   this.hashOnFocusScrollObject = {hashVisible: false,
  //     hashName: ''}
  //  }

  constructor(private platformLocation : PlatformLocation,
    private elementRef:ElementRef,
    private route:Router,
    // private activatedRouteSnapshot:ActivatedRouteSnapshot,
    private activatedRoute :ActivatedRoute) { 
      // console.log(this.activatedRouteSnapshot.fragment);
      console.log(this.activatedRoute.snapshot.fragment);
    }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event)
 {
      console.log(this.idexToc);
      console.log(this.getCurrentHash());
      console.log(this.activatedRoute.snapshot.parent.fragment)
  //  if(this.getCurrentHash() ==   this.scrollToPage[this.idexToc])
  if (this.activatedRoute.snapshot.fragment == this.scrollToPage[this.idexToc])
      {this.elementRef.nativeElement.style.backgroundColor = 'yellow';
      this.elementRef.nativeElement.style.color = 'brown';
   }
   else 
    {this.elementRef.nativeElement.style.backgroundColor = 'white';
    this.elementRef.nativeElement.style.color = 'black';
    // this.elementRef.nativeElement.style.

   }
 }



  getCurrentHash() {
    // return decodeURIComponent(this.platformLocation.hash.replace(/^#\/scroll#/, ''));
    return decodeURIComponent(this.platformLocation.hash);
  //  this.platformLocation.onHashChange.arguments
  // return this.location.subscribe;
  }

}
