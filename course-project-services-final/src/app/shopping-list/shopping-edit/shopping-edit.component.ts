import {
  Component, OnDestroy,
  OnInit,
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
subscriptipn: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.slService.startedEditing.subscribe(
      (index: number) => {

      }
    );
  }
  ngOnDestroy(){
    this.subscriptipn.unsubscribe();
  }

  onAddItem(form : NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.slService.addIngredient(newIngredient);
  }

}
