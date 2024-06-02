import {Component, OnDestroy, OnInit, ViewChild,} from '@angular/core';

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slFrom: NgForm;
  subscriptipn: Subscription;
  editmode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit() {
    this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editmode = true;
        this.editedItem = this.slService.getIngerdient(index);
        this.slFrom.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  ngOnDestroy() {
    this.subscriptipn.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editmode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editmode = false;
    form.reset();
  }

  onClear() {
    this.slFrom.reset();
    this.editmode = false;
  }

  onDelete() {
this.slService.deleteIngerdient(this.editedItemIndex);
    this.onClear();
  }
}
