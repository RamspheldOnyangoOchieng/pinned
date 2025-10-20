import { createClient } from '@/lib/supabase/server';

export default async function TestImagesPage() {
  const supabase = await createClient();
  
  const { data: images, error } = await supabase
    .from('attribute_images')
    .select('*')
    .eq('category', 'age')
    .eq('style', 'realistic')
    .order('value');

  if (error) {
    return <div className="p-8">Error: {error.message}</div>;
  }

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Test: Age Images (Realistic)</h1>
      
      <div className="grid grid-cols-3 gap-4">
        {images?.map((img) => (
          <div key={img.id} className="border border-gray-700 rounded-lg overflow-hidden">
            <img 
              src={img.image_url} 
              alt={`${img.category} ${img.value}`}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold">{img.value}</h3>
              <p className="text-sm text-gray-400">{img.category} - {img.style}</p>
              <p className="text-xs text-gray-500 mt-2 truncate">{img.image_url}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">API Test</h2>
        <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-xs">
          {JSON.stringify(images, null, 2)}
        </pre>
      </div>
    </div>
  );
}
