

export async function load({ locals }) {
	return { visit_id: locals.visit_id, token: locals.token };
}