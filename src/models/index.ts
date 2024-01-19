import { company } from './company'
import { category } from './category'
import { banner } from './banner'
import { auth } from './auth'
import { cashback } from './cashback'
import { cashbackCard } from './cashbackCard'
import { coupon } from './coupon'
import { store } from './store'
import { topDeal } from './topDeal'
import { seasonDeal } from './seasonDeal'
import { sections } from './sections'
import { subscribe } from './subscribe'
  
import { Models } from "@rematch/core"

export const models: RootModel = {
	company,
	category,
	banner,
	cashback,
	auth,
	cashbackCard,
	coupon,
	store,
	topDeal,
	seasonDeal,
	sections,
	subscribe
}
export interface RootModel extends Models<RootModel> {
	company: any,
	category: any,
	banner: any,
	auth: any,
	cashback: any,
	cashbackCard: any,
	coupon: any,
	store: any,
	topDeal: any,
	seasonDeal: any,
	sections: any,
	subscribe: any,
}