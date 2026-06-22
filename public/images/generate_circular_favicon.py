import base64

def generate_svg():
    image_path = 'public/images/deep-ilasariya.webp'
    svg_path = 'public/images/favicon.svg'
    
    with open(image_path, 'rb') as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <defs>
    <clipPath id="circle-clip">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
  </defs>
  <!-- Embedded photo cropped to circle -->
  <image href="data:image/webp;base64,{encoded_string}" x="0" y="0" width="32" height="32" clip-path="url(#circle-clip)" />
</svg>
"""
    
    with open(svg_path, 'w') as svg_file:
        svg_file.write(svg_content)
    print("Successfully generated self-contained SVG favicon!")

if __name__ == '__main__':
    generate_svg()
