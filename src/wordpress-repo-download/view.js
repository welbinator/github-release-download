document.addEventListener('DOMContentLoaded', function () {
	const buttons = document.querySelectorAll('.wordpress-repo-button');

	buttons.forEach((button) => {
		button.addEventListener('click', async function () {
			const slug = button.getAttribute('data-slug');
			const type = button.getAttribute('data-type');
			
			if (!slug || !type) return alert('Missing WordPress.org plugin/theme information.');

			button.textContent = 'Fetching...';

			try {
				const response = await fetch(`/wp-admin/admin-ajax.php?action=get_wordpress_repo_data&slug=${encodeURIComponent(slug)}&type=${encodeURIComponent(type)}`);
				const data = await response.json();

				if (data.success && data.data.download_url) {
					window.location.href = data.data.download_url;
				} else {
					alert(data.data?.message || 'Download failed.');
				}
			} catch (err) {
				console.error(err);
				alert('Error fetching download.');
			} finally {
				button.textContent = button.getAttribute('data-original-text') || 'Download from WordPress.org';
			}
		});
	});
});
