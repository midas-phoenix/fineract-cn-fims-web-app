/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { Injectable } from '@angular/core';
import { Actions, Effect ,ofType} from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as customerActions from '../customer.actions';
import { CustomerService } from '../../../services/customer/customer.service';
import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class CustomerApiEffects {

  @Effect()
  createCustomer$: Observable<Action> = this.actions$
    .pipe(ofType(customerActions.CREATE),
      map((action: customerActions.CreateCustomerAction) => action.payload),
      mergeMap(payload =>
        this.customerService.createCustomer(payload.customer).pipe(
          map(() => new customerActions.CreateCustomerSuccessAction({
            resource: payload.customer,
            activatedRoute: payload.activatedRoute
          })),
          catchError((error) => of(new customerActions.CreateCustomerFailAction(error))))
      ));

  @Effect()
  updateCustomer$: Observable<Action> = this.actions$
    .pipe(ofType(customerActions.UPDATE),
      map((action: customerActions.UpdateCustomerAction) => action.payload),
      mergeMap(payload =>
        this.customerService.updateCustomer(payload.customer).pipe(
          map(() => new customerActions.UpdateCustomerSuccessAction({
            resource: payload.customer,
            activatedRoute: payload.activatedRoute
          })),
          catchError((error) => of(new customerActions.UpdateCustomerFailAction(error))))
      ));

  constructor(private actions$: Actions, private customerService: CustomerService) { }

}
