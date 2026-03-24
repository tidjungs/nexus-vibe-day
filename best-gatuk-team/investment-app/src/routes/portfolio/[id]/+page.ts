import { error } from '@sveltejs/kit';
import { holdingById } from '$lib/data';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (!holdingById(params.id)) throw error(404, 'Holding not found');
	return { id: params.id };
};
