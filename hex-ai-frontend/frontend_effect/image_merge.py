from PIL import Image
import os

def merge_images(folder_path, output_filename="merged_ui.png"):
    """
    Merge images in the specified folder into a single horizontal image

    Args:
        folder_path: Path to folder containing images
        output_filename: Name of the output merged image
    """
    # Get list of image files (png)
    image_files = [f for f in os.listdir(folder_path) if f.endswith('.png')]

    if not image_files:
        print("No PNG images found in the folder.")
        return

    print(f"Found {len(image_files)} images: {image_files}")

    # Open all images
    images = [Image.open(os.path.join(folder_path, img)) for img in image_files]

    # Calculate dimensions for the merged image
    # Use max height and sum of widths for horizontal arrangement
    max_height = max(img.height for img in images)
    total_width = sum(img.width for img in images)

    # Create a new blank image with the calculated dimensions
    merged_image = Image.new('RGB', (total_width, max_height))

    # Paste each image side by side
    x_offset = 0
    for img in images:
        # Center vertically if needed
        y_offset = (max_height - img.height) // 2
        merged_image.paste(img, (x_offset, y_offset))
        x_offset += img.width

    # Save the merged image
    output_path = os.path.join(folder_path, output_filename)
    merged_image.save(output_path)
    print(f"Merged image saved to {output_path}")

if __name__ == "__main__":
    # Use current directory as the folder path
    current_folder = os.path.dirname(os.path.abspath(__file__))
    merge_images(current_folder)

    print("Alternative layouts available:")
    print("1. Vertical stack: Add parameter 'vertical=True' to merge_images()")
    print("2. Grid layout: Use merge_images_grid() function instead")
