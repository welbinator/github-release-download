document.addEventListener('DOMContentLoaded', function () {
	const buttons = document.querySelectorAll('.github-release-download-shortcode .github-release-button');

	buttons.forEach((button) => {
		button.addEventListener('click', async function () {
			const apiUrl = button.getAttribute('data-api-url');
			if (!apiUrl) return alert('Missing GitHub API URL.');

			button.disabled = true;
			const originalText = button.textContent;
			button.textContent = 'Fetching…';

			try {
				const response = await fetch(`/wp-admin/admin-ajax.php?action=get_release_data&url=${encodeURIComponent(apiUrl)}`);
				const data = await response.json();

				if (data.success && data.data.download_url) {
					window.location.href = data.data.download_url;
				} else {
					alert(data.data?.message || 'Download failed.');
				}
			} catch (err) {
				console.error(err);
				alert('Error fetching release.');
			} finally {
				button.disabled = false;
				button.textContent = originalText;
			}
		});
	});
});
