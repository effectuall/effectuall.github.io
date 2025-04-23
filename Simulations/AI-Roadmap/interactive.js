// AI Evolution Roadmap - Interactive Visualization
// Main JavaScript file for implementing interactive features

// Global variables
let currentTimePeriod = 'near'; // 'near', 'mid', 'long'
let currentSector = 'all'; // 'all', 'healthcare', 'education', 'environment', 'society'
let currentCulturalLens = 'global'; // 'global', 'western', 'eastern', 'south', 'indigenous'
let zoomLevel = 1;
let isDetailsVisible = false;

// Timeline periods with their year ranges
const timePeriods = {
  near: { start: 2025, end: 2030, label: 'Near-term', color: '#3498db' },
  mid: { start: 2031, end: 2037, label: 'Mid-term', color: '#9b59b6' },
  long: { start: 2038, end: 2045, label: 'Long-term', color: '#e74c3c' }
};

// Sectors with their colors and labels
const sectors = {
  healthcare: { label: 'Healthcare', color: '#2ecc71' },
  education: { label: 'Education', color: '#3498db' },
  environment: { label: 'Environment', color: '#f39c12' },
  society: { label: 'Society', color: '#9b59b6' }
};

// Cultural perspectives
const culturalPerspectives = {
  global: { label: 'Global View', description: 'Balanced perspective incorporating all cultural viewpoints' },
  western: { label: 'Western Perspective', description: 'Focus on individual rights, privacy, and regulatory frameworks' },
  eastern: { label: 'Eastern Perspective', description: 'Emphasis on social harmony, collective benefit, and pragmatic integration' },
  south: { label: 'Global South Perspective', description: 'Priority on development leapfrogging and addressing local needs' },
  indigenous: { label: 'Indigenous Knowledge', description: 'Holistic understanding with emphasis on intergenerational responsibility' }
};

// Initialize the visualization when the document is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeVisualization();
  setupEventListeners();
  renderTimeline();
});

// Initialize the visualization container and elements
function initializeVisualization() {
  const container = document.getElementById('roadmap-container');
  
  // Create timeline navigation
  const timelineNav = document.createElement('div');
  timelineNav.className = 'timeline-navigation';
  
  Object.keys(timePeriods).forEach(period => {
    const button = document.createElement('button');
    button.className = `time-button ${period === currentTimePeriod ? 'active' : ''}`;
    button.dataset.period = period;
    button.textContent = timePeriods[period].label;
    button.style.backgroundColor = timePeriods[period].color;
    timelineNav.appendChild(button);
  });
  
  container.appendChild(timelineNav);
  
  // Create sector filter
  const sectorFilter = document.createElement('div');
  sectorFilter.className = 'sector-filter';
  
  const allSectorButton = document.createElement('button');
  allSectorButton.className = `sector-button ${currentSector === 'all' ? 'active' : ''}`;
  allSectorButton.dataset.sector = 'all';
  allSectorButton.textContent = 'All Sectors';
  sectorFilter.appendChild(allSectorButton);
  
  Object.keys(sectors).forEach(sector => {
    const button = document.createElement('button');
    button.className = `sector-button ${sector === currentSector ? 'active' : ''}`;
    button.dataset.sector = sector;
    button.textContent = sectors[sector].label;
    button.style.borderColor = sectors[sector].color;
    sectorFilter.appendChild(button);
  });
  
  container.appendChild(sectorFilter);
  
  // Create cultural perspective selector
  const culturalSelector = document.createElement('div');
  culturalSelector.className = 'cultural-selector';
  
  const culturalLabel = document.createElement('div');
  culturalLabel.className = 'selector-label';
  culturalLabel.textContent = 'Cultural Perspective:';
  culturalSelector.appendChild(culturalLabel);
  
  const culturalSelect = document.createElement('select');
  culturalSelect.id = 'cultural-perspective';
  
  Object.keys(culturalPerspectives).forEach(perspective => {
    const option = document.createElement('option');
    option.value = perspective;
    option.textContent = culturalPerspectives[perspective].label;
    culturalSelect.appendChild(option);
  });
  
  culturalSelector.appendChild(culturalSelect);
  container.appendChild(culturalSelector);
  
  // Create zoom controls
  const zoomControls = document.createElement('div');
  zoomControls.className = 'zoom-controls';
  
  const zoomInButton = document.createElement('button');
  zoomInButton.className = 'zoom-button';
  zoomInButton.id = 'zoom-in';
  zoomInButton.textContent = '+';
  zoomControls.appendChild(zoomInButton);
  
  const zoomOutButton = document.createElement('button');
  zoomOutButton.className = 'zoom-button';
  zoomOutButton.id = 'zoom-out';
  zoomOutButton.textContent = '-';
  zoomControls.appendChild(zoomOutButton);
  
  container.appendChild(zoomControls);
  
  // Create main visualization area
  const visualizationArea = document.createElement('div');
  visualizationArea.className = 'visualization-area';
  visualizationArea.id = 'visualization-area';
  container.appendChild(visualizationArea);
  
  // Create details panel
  const detailsPanel = document.createElement('div');
  detailsPanel.className = 'details-panel';
  detailsPanel.id = 'details-panel';
  
  const detailsHeader = document.createElement('div');
  detailsHeader.className = 'details-header';
  detailsHeader.id = 'details-header';
  detailsPanel.appendChild(detailsHeader);
  
  const detailsContent = document.createElement('div');
  detailsContent.className = 'details-content';
  detailsContent.id = 'details-content';
  detailsPanel.appendChild(detailsContent);
  
  const closeButton = document.createElement('button');
  closeButton.className = 'close-button';
  closeButton.id = 'close-details';
  closeButton.textContent = '×';
  detailsPanel.appendChild(closeButton);
  
  container.appendChild(detailsPanel);
}

// Set up event listeners for interactive elements
function setupEventListeners() {
  // Time period selection
  document.querySelectorAll('.time-button').forEach(button => {
    button.addEventListener('click', function() {
      currentTimePeriod = this.dataset.period;
      document.querySelectorAll('.time-button').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      renderTimeline();
    });
  });
  
  // Sector filter
  document.querySelectorAll('.sector-button').forEach(button => {
    button.addEventListener('click', function() {
      currentSector = this.dataset.sector;
      document.querySelectorAll('.sector-button').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      renderTimeline();
    });
  });
  
  // Cultural perspective selector
  document.getElementById('cultural-perspective').addEventListener('change', function() {
    currentCulturalLens = this.value;
    renderTimeline();
  });
  
  // Zoom controls
  document.getElementById('zoom-in').addEventListener('click', function() {
    if (zoomLevel < 3) {
      zoomLevel += 0.5;
      applyZoom();
    }
  });
  
  document.getElementById('zoom-out').addEventListener('click', function() {
    if (zoomLevel > 0.5) {
      zoomLevel -= 0.5;
      applyZoom();
    }
  });
  
  // Close details panel
  document.getElementById('close-details').addEventListener('click', function() {
    hideDetailsPanel();
  });
}

// Apply zoom level to visualization
function applyZoom() {
  const visualizationArea = document.getElementById('visualization-area');
  visualizationArea.style.transform = `scale(${zoomLevel})`;
}

// Render the timeline based on current selections
function renderTimeline() {
  const visualizationArea = document.getElementById('visualization-area');
  visualizationArea.innerHTML = '';
  
  // Get the selected time period
  const period = timePeriods[currentTimePeriod];
  
  // Create timeline container
  const timelineContainer = document.createElement('div');
  timelineContainer.className = 'timeline-container';
  
  // Create year markers
  for (let year = period.start; year <= period.end; year++) {
    const yearMarker = document.createElement('div');
    yearMarker.className = 'year-marker';
    yearMarker.textContent = year;
    timelineContainer.appendChild(yearMarker);
  }
  
  visualizationArea.appendChild(timelineContainer);
  
  // Create layers for each sector
  const sectorsToRender = currentSector === 'all' ? Object.keys(sectors) : [currentSector];
  
  sectorsToRender.forEach(sector => {
    const sectorLayer = createSectorLayer(sector, period);
    visualizationArea.appendChild(sectorLayer);
  });
  
  // Apply cultural perspective modifications
  applyCulturalPerspective();
  
  // Apply current zoom level
  applyZoom();
}

// Create a layer for a specific sector
function createSectorLayer(sectorKey, period) {
  const sector = sectors[sectorKey];
  const sectorLayer = document.createElement('div');
  sectorLayer.className = `sector-layer ${sectorKey}-layer`;
  
  // Create sector label
  const sectorLabel = document.createElement('div');
  sectorLabel.className = 'sector-label';
  sectorLabel.textContent = sector.label;
  sectorLabel.style.color = sector.color;
  sectorLayer.appendChild(sectorLabel);
  
  // Create sector stream
  const sectorStream = document.createElement('div');
  sectorStream.className = 'sector-stream';
  sectorStream.style.backgroundColor = `${sector.color}33`; // Add transparency
  sectorStream.style.borderColor = sector.color;
  
  // Add milestone nodes based on the sector and time period
  const milestones = getMilestones(sectorKey, period);
  
  milestones.forEach(milestone => {
    const milestoneNode = document.createElement('div');
    milestoneNode.className = 'milestone-node';
    milestoneNode.style.left = `${((milestone.year - period.start) / (period.end - period.start)) * 100}%`;
    milestoneNode.style.backgroundColor = sector.color;
    
    // Add tooltip with brief description
    const tooltip = document.createElement('div');
    tooltip.className = 'milestone-tooltip';
    tooltip.textContent = milestone.title;
    milestoneNode.appendChild(tooltip);
    
    // Add click event to show details
    milestoneNode.addEventListener('click', function() {
      showDetailsPanel(milestone, sector);
    });
    
    sectorStream.appendChild(milestoneNode);
  });
  
  sectorLayer.appendChild(sectorStream);
  return sectorLayer;
}

// Apply cultural perspective modifications to the visualization
function applyCulturalPerspective() {
  const perspective = culturalPerspectives[currentCulturalLens];
  
  // Update the description of the current perspective
  const descriptionElement = document.createElement('div');
  descriptionElement.className = 'perspective-description';
  descriptionElement.textContent = perspective.description;
  
  // Apply visual modifications based on cultural perspective
  switch (currentCulturalLens) {
    case 'western':
      // Emphasize individual milestones, regulatory frameworks
      document.querySelectorAll('.milestone-node').forEach(node => {
        node.style.border = '2px solid #fff';
      });
      break;
    case 'eastern':
      // Emphasize connections between milestones, collective impact
      document.querySelectorAll('.sector-stream').forEach(stream => {
        stream.style.height = '8px';
      });
      break;
    case 'south':
      // Emphasize practical applications and development impact
      document.querySelectorAll('.milestone-tooltip').forEach(tooltip => {
        tooltip.style.fontWeight = 'bold';
      });
      break;
    case 'indigenous':
      // Emphasize holistic connections across sectors
      document.querySelectorAll('.sector-layer').forEach(layer => {
        layer.style.opacity = '0.9';
      });
      break;
    default:
      // Default global view
      break;
  }
  
  // Add the description to the visualization area
  document.getElementById('visualization-area').appendChild(descriptionElement);
}

// Show details panel with milestone information
function showDetailsPanel(milestone, sector) {
  const header = document.getElementById('details-header');
  const content = document.getElementById('details-content');
  
  header.textContent = milestone.title;
  header.style.backgroundColor = sector.color;
  
  content.innerHTML = '';
  
  // Add year
  const yearElement = document.createElement('div');
  yearElement.className = 'detail-year';
  yearElement.textContent = `Year: ${milestone.year}`;
  content.appendChild(yearElement);
  
  // Add description
  const descriptionElement = document.createElement('div');
  descriptionElement.className = 'detail-description';
  descriptionElement.textContent = milestone.description;
  content.appendChild(descriptionElement);
  
  // Add cultural variations if available
  if (milestone.culturalVariations) {
    const variationsTitle = document.createElement('h3');
    variationsTitle.textContent = 'Cultural Perspectives';
    content.appendChild(variationsTitle);
    
    Object.keys(milestone.culturalVariations).forEach(culture => {
      const variationElement = document.createElement('div');
      variationElement.className = `cultural-variation ${culture}`;
      
      const cultureLabel = document.createElement('strong');
      cultureLabel.textContent = culturalPerspectives[culture].label + ': ';
      variationElement.appendChild(cultureLabel);
      
      const variationText = document.createElement('span');
      variationText.textContent = milestone.culturalVariations[culture];
      variationElement.appendChild(variationText);
      
      content.appendChild(variationElement);
    });
  }
  
  // Add implications if available
  if (milestone.implications) {
    const implicationsTitle = document.createElement('h3');
    implicationsTitle.textContent = 'Implications';
    content.appendChild(implicationsTitle);
    
    const implicationsList = document.createElement('ul');
    milestone.implications.forEach(implication => {
      const item = document.createElement('li');
      item.textContent = implication;
      implicationsList.appendChild(item);
    });
    
    content.appendChild(implicationsList);
  }
  
  // Show the panel
  const panel = document.getElementById('details-panel');
  panel.style.display = 'block';
  isDetailsVisible = true;
}

// Hide details panel
function hideDetailsPanel() {
  const panel = document.getElementById('details-panel');
  panel.style.display = 'none';
  isDetailsVisible = false;
}

// Get milestones for a specific sector and time period
function getMilestones(sector, period) {
  // This would typically come from a data file or API
  // For now, we'll use placeholder data based on our research
  
  const milestoneData = {
    healthcare: {
      near: [
        {
          year: 2025,
          title: 'AI Diagnostic Specialist-Level Accuracy',
          description: 'AI diagnostic tools achieve medical specialist-level accuracy in multiple specialties, transforming early disease detection and diagnosis.',
          culturalVariations: {
            western: 'Focus on regulatory approval and integration with existing healthcare systems.',
            eastern: 'Rapid deployment in hospital systems with emphasis on efficiency gains.',
            south: 'Adaptation to resource-constrained settings with focus on accessibility.',
            indigenous: 'Integration with traditional diagnostic approaches and community health workers.'
          },
          implications: [
            'Increased early detection of diseases',
            'Reduced diagnostic errors',
            'Changing roles for medical specialists',
            'New training requirements for healthcare workers'
          ]
        },
        {
          year: 2027,
          title: 'Personalized Treatment Plans',
          description: 'Personalized treatment plans based on AI analysis of genomic, lifestyle, and medical history data become standard in many healthcare systems.',
          culturalVariations: {
            western: 'Emphasis on patient choice and data privacy.',
            eastern: 'Integration with national health databases and population health management.',
            south: 'Focus on cost-effective implementations suitable for diverse populations.',
            indigenous: 'Incorporation of traditional healing knowledge and practices.'
          }
        },
        {
          year: 2029,
          title: 'AI-Guided Surgical Robots',
          description: 'Surgical robots with AI guidance systems achieve widespread adoption, improving precision and reducing recovery times.',
          culturalVariations: {
            western: 'Focus on surgeon control and liability frameworks.',
            eastern: 'Emphasis on efficiency and standardization of procedures.',
            south: 'Adaptation to address surgical specialist shortages.',
            indigenous: 'Integration with cultural practices around healing and body integrity.'
          }
        }
      ],
      mid: [
        {
          year: 2031,
          title: 'AI-Human Collaborative Diagnosis',
          description: 'AI-human collaborative diagnosis becomes the standard of care, combining the strengths of both human intuition and AI pattern recognition.'
        },
        {
          year: 2033,
          title: 'AI-Driven Preventive Medicine',
          description: 'Preventive medicine driven by AI prediction models reduces hospital admissions by 30% for chronic conditions.'
        },
        {
          year: 2036,
          title: 'AI Mental Health Revolution',
          description: 'Mental health treatment transformed by AI therapy assistants and continuous monitoring systems.'
        }
      ],
      long: [
        {
          year: 2038,
          title: 'Real-time Health Monitoring',
          description: 'Personalized medicine incorporating real-time AI monitoring becomes standard, with continuous health optimization.'
        },
        {
          year: 2041,
          title: 'Genetic Profile Treatments',
          description: 'AI-designed treatments tailored to individual genetic profiles become routine, revolutionizing efficacy rates.'
        },
        {
          year: 2044,
          title: 'Autonomous Medical Systems',
          description: 'Autonomous medical systems provide care in underserved regions, addressing global healthcare inequities.'
        }
      ]
    },
    education: {
      near: [
        {
          year: 2025,
          title: 'Adaptive Learning Platforms',
          description: 'Adaptive learning platforms using AI become standard in 30% of educational institutions, personalizing learning paths.'
        },
        {
          year: 2027,
          title: 'AI Teaching Assistants',
          description: 'AI teaching assistants handle routine grading and administrative tasks in most schools, freeing teacher time.'
        },
        {
          year: 2029,
          title: 'Global Educational Access',
          description: 'Global access to education expands through AI-powered translation and localization of content.'
        }
      ],
      mid: [
        {
          year: 2032,
          title: 'Continuous AI Evaluation',
          description: 'Traditional educational assessment largely replaced by continuous AI evaluation of skills and knowledge.'
        },
        {
          year: 2034,
          title: 'Global Knowledge Equalization',
          description: 'Global knowledge access equalized through AI translation and adaptation of educational content.'
        },
        {
          year: 2036,
          title: 'Human-AI Co-teaching',
          description: 'Human-AI co-teaching becomes the dominant educational model, combining strengths of both.'
        }
      ],
      long: [
        {
          year: 2039,
          title: 'Fully Personalized Education',
          description: 'Education becomes fully personalized with AI systems adapting to individual needs, interests, and learning styles.'
        },
        {
          year: 2041,
          title: 'Universal Knowledge Access',
          description: 'Global knowledge access becomes nearly universal through AI systems, addressing educational inequities.'
        },
        {
          year: 2044,
          title: 'Lifelong Learning Revolution',
          description: 'Education evolves into continuous lifelong process guided by AI mentors, adapting to changing career needs.'
        }
      ]
    },
    environment: {
      near: [
        {
          year: 2026,
          title: 'AI-Optimized Renewable Energy',
          description: 'AI-optimized renewable energy grids achieve 15-20% efficiency improvements, accelerating clean energy transition.'
        },
        {
          year: 2027,
          title: 'Precision Agriculture Systems',
          description: 'Precision agriculture using AI reduces water usage by 30% and increases yields by 20% in adopting regions.'
        },
        {
          year: 2029,
          title: 'Smart City Implementation',
          description: 'Smart city implementations using AI reduce urban energy consumption by 25% through optimized systems.'
        }
      ],
      mid: [
        {
          year: 2031,
          title: 'AI-Managed Circular Economy',
          description: 'AI-managed circular economy systems reduce waste by 40% in advanced economies through optimized resource use.'
        },
        {
          year: 2033,
          title: 'Climate Intervention Strategies',
          description: 'Climate intervention strategies guided by AI simulations begin limited deployment with careful monitoring.'
        },
        {
          year: 2036,
          title: 'Autonomous Environmental Restoration',
          description: 'Autonomous environmental restoration systems using AI and robotics deployed globally for ecosystem recovery.'
        }
      ],
      long: [
        {
          year: 2039,
          title: 'AI-Managed Ecosystems',
          description: 'AI-managed ecosystems restore biodiversity in previously degraded areas through continuous optimization.'
        },
        {
          year: 2041,
          title: 'Sustainable Resource Management',
          description: 'Sustainable resource usage achieved through AI management in most sectors, balancing human needs with planetary boundaries.'
        },
        {
          year: 2044,
          title: 'Technology-Nature Symbiosis',
          description: 'Symbiotic relationship between technology and nature established through AI mediation, creating regenerative systems.'
        }
      ]
    },
    society: {
      near: [
        {
          year: 2026,
          title: 'Digital Divide Expansion',
          description: 'Digital divide begins widening between AI-enabled and non-enabled populations, creating new social challenges.'
        },
        {
          year: 2027,
          title: 'AI Regulatory Frameworks',
          description: 'Initial comprehensive AI regulatory frameworks established in major economies, setting governance patterns.'
        },
        {
          year: 2029,
          title: 'Job Transformation Wave',
          description: '15-20% of traditional jobs transformed or displaced by AI automation, with varying regional impacts.'
        }
      ],
      mid: [
        {
          year: 2032,
          title: 'Global Ethical Frameworks',
          description: 'Established ethical frameworks for AI development implemented globally, with cultural adaptations.'
        },
        {
          year: 2034,
          title: 'AI as Collaborative Partners',
          description: 'Cultural adaptation to AI as collaborative partners rather than tools, changing human-machine relationships.'
        },
        {
          year: 2036,
          title: 'New Social Movements',
          description: 'Emergence of new social movements centered on AI rights and limitations, challenging traditional frameworks.'
        }
      ],
      long: [
        {
          year: 2039,
          title: 'Governance Model Shifts',
          description: 'Fundamental shifts in governance models incorporating AI systems, transforming decision-making processes.'
        },
        {
          year: 2041,
          title: 'Human-AI Creative Renaissance',
          description: 'Cultural renaissance driven by AI-human creative partnerships, generating new art forms and cultural expressions.'
        },
        {
          year: 2044,
          title: 'New Social Contracts',
          description: 'New social contracts addressing universal basic income and purpose in AI-abundant world, redefining work and value.'
        }
      ]
    }
  };
  
  // Return milestones for the selected sector and time period
  return milestoneData[sector][currentTimePeriod] || [];
}
