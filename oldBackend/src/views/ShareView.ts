import Share from '../database/models/Share';

import UserView from './UserView';

class ShareView {
	RenderShare(shares: Share[]) {
		return shares.map(share => ({
			id: share.id,
         edited: Boolean(share.edited),
			descricao: share.description,
			user: UserView.RenderSimpleUser(share.user),
			sharedAt: share.sharedAt,
		}));
	}
}

export default new ShareView();
