-- Create table for storing generated attribute images
CREATE TABLE IF NOT EXISTS attribute_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(50) NOT NULL, -- 'age', 'body', 'ethnicity', 'language', etc.
    value VARCHAR(100) NOT NULL, -- '18-22', 'European', 'Slim', etc.
    style VARCHAR(20) NOT NULL, -- 'realistic' or 'anime'
    image_url TEXT NOT NULL,
    seed BIGINT, -- Changed from INTEGER to BIGINT to handle large seed values
    width INTEGER DEFAULT 512,
    height INTEGER DEFAULT 768,
    prompt TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique combination
    UNIQUE(category, value, style)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_attribute_images_lookup 
ON attribute_images(category, value, style);

-- Create index for created_at for ordering
CREATE INDEX IF NOT EXISTS idx_attribute_images_created 
ON attribute_images(created_at DESC);

-- Create table for style selection images (Realistic vs Anime)
CREATE TABLE IF NOT EXISTS style_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    style VARCHAR(20) NOT NULL UNIQUE, -- 'realistic' or 'anime'
    image_url TEXT NOT NULL,
    title VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default style image placeholders (with placeholder URLs)
INSERT INTO style_images (style, image_url, title, description) VALUES
    ('realistic', 'https://placehold.co/400x600/png?text=Realistic', 'Realistic', 'Lifelike and photorealistic AI companions'),
    ('anime', 'https://placehold.co/400x600/png?text=Anime', 'Anime', 'Stylized anime and manga aesthetics')
ON CONFLICT (style) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_attribute_images_updated_at 
    BEFORE UPDATE ON attribute_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_style_images_updated_at 
    BEFORE UPDATE ON style_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create table for image generation queue (optional, for async processing)
CREATE TABLE IF NOT EXISTS image_generation_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(50) NOT NULL,
    value VARCHAR(100) NOT NULL,
    style VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    prompt TEXT,
    error_message TEXT,
    retries INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_image_queue_status 
ON image_generation_queue(status, created_at);
