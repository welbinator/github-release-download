document.addEventListener('DOMContentLoaded', function () {
	const buttons = document.querySelectorAll('.github-release-button');

	buttons.forEach((button) => {
		button.addEventListener('click', async function () {
			const apiUrl = button.getAttribute('data-api-url');
			if (!apiUrl) return alert('Missing GitHub API URL.');

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
				button.textContent = button.getAttribute('data-original-text') || 'Download from GitHub';
			}
		});
	});
});
