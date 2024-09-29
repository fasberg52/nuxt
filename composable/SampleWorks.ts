import { ref } from 'vue';
import type { ExampleWork } from '~/interfaces/example-work.interface';
import type { PortfolioItem } from '~/interfaces/example-work.interface';

export function useSampleWorks() {
  const sampleWorks = ref<ExampleWork[]>([]); // Explicitly define the type
  const loading = ref(true);

  async function fetchSampleWorks() {
    loading.value = true;
    try {
      const response = await fetch(
        'https://wordprss-vsfnmdvj4.liara.run/wp-json/wp/v2/portfolio',
      );
      const data: PortfolioItem[] = await response.json();

      // Fetch featured images for each portfolio item
      const worksWithImages = await Promise.all(
        data.map(async (item: PortfolioItem) => {
          let imageUrl = '';

          // Fetch the image URL using the featured_media ID
          if (item.featured_media) {
            const mediaResponse = await fetch(
              `https://wordprss-vsfnmdvj4.liara.run/wp-json/wp/v2/media/${item.featured_media}`,
            );
            const mediaData = await mediaResponse.json();
            imageUrl = mediaData.source_url; // Extract image URL from media data
          }

          return {
            id: item.id.toString(),
            image: imageUrl,
            title: item.title.rendered,
            description: item.excerpt.rendered.replace(/(<([^>]+)>)/gi, ''),
            url: item.link,
          };
        }),
      );

      sampleWorks.value = worksWithImages;
    } catch (error) {
      console.error('Error fetching sample works:', error);
    } finally {
      loading.value = false;
    }
  }

  return { sampleWorks, fetchSampleWorks, loading };
}
