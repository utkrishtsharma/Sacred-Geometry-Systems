import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, RotateCcw, Download, Activity, Waves, Circle, Grid3x3, TrendingUp, Zap, Radio } from 'lucide-react';

/**
 * N-Dimensional Schematic Visualizer with Vedic Sound Technology
 * Integrates advanced analytics with ancient sound geometries
 */
const NDimensionalVisualizer = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  
  // Core dimensional parameters
  const [dimensions, setDimensions] = useState(3);
  const [pointCount, setPointCount] = useState(1000);
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(0);
  
  // Geometry and projection
  const [geometryType, setGeometryType] = useState('sri_yantra');
  const [projectionMode, setProjectionMode] = useState('perspective');
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  
  // Vedic sound parameters
  const [soundFrequency, setSoundFrequency] = useState(432); // Hz - Vedic tuning
  const [harmonicOrder, setHarmonicOrder] = useState(3);
  const [mandalaTiers, setMandalaTiers] = useState(5);
  const [chakraAlignment, setChakraAlignment] = useState('sahasrara');
  
  // Wave properties
  const [amplitudeScale, setAmplitudeScale] = useState(1.0);
  const [phaseOffset, setPhaseOffset] = useState(0);
  const [resonanceMode, setResonanceMode] = useState('standing');
  
  // Display options
  const [showGrid, setShowGrid] = useState(true);
  const [showAxes, setShowAxes] = useState(true);
  const [showWaveform, setShowWaveform] = useState(true);
  const [showMandala, setShowMandala] = useState(true);
  const [colorMode, setColorMode] = useState('thermal');
  
  // Advanced analytics state
  const [analytics, setAnalytics] = useState({
    // Dimensional metrics
    avgAmplitude: 0,
    maxAmplitude: 0,
    minAmplitude: 0,
    stdDeviation: 0,
    
    // Wave properties
    dominantFrequency: 0,
    harmonicRatio: 0,
    phaseCoherence: 0,
    
    // Geometric analysis
    symmetryIndex: 0,
    fractalDimension: 0,
    spatialEntropy: 0,
    
    // Vedic metrics
    nadaResonance: 0,
    chakraAlignment: 0,
    mantricHarmony: 0,
    
    // Performance
    computeTime: 0,
    particleCount: 0,
    fps: 0
  });
  
  // Chakra frequency mapping (Hz)
  const chakraFrequencies = {
    muladhara: 256,    // Root - C
    svadhisthana: 288, // Sacral - D
    manipura: 320,     // Solar - E
    anahata: 341,      // Heart - F
    vishuddha: 384,    // Throat - G
    ajna: 426,         // Third Eye - A
    sahasrara: 480     // Crown - B
  };

  /**
   * Generate N-dimensional points based on sacred geometry
   */
  const generateSacredGeometry = useMemo(() => {
    const startTime = performance.now();
    const points = [];
    
    // Sri Yantra generation - sacred Hindu geometry
    const generateSriYantra = () => {
      const triangles = 9; // 9 interlocking triangles
      
      for (let t = 0; t < triangles; t++) {
        const isUpward = t % 2 === 0;
        const scale = 1 - (t * 0.1);
        const rotation = (t * Math.PI / 4.5) + time * rotationSpeed * 0.1;
        
        for (let i = 0; i < pointCount / triangles; i++) {
          const angle = (i / (pointCount / triangles)) * Math.PI * 2;
          const r = scale * (0.5 + 0.5 * Math.sin(angle * 3 + time));
          
          const point = [];
          for (let d = 0; d < dimensions; d++) {
            if (d === 0) {
              point.push(r * Math.cos(angle + rotation) * (isUpward ? 1 : -1));
            } else if (d === 1) {
              point.push(r * Math.sin(angle + rotation) * (isUpward ? 1 : -1));
            } else {
              const freq = soundFrequency * (d - 1) / 100;
              point.push(Math.sin(time * freq + angle) * scale * 0.5);
            }
          }
          points.push(point);
        }
      }
    };
    
    // Mandala pattern generation
    const generateMandala = () => {
      for (let tier = 0; tier < mandalaTiers; tier++) {
        const tierRadius = (tier + 1) / mandalaTiers;
        const petals = 6 + tier * 2; // Increasing petals per tier
        
        for (let p = 0; p < petals; p++) {
          const angle = (p / petals) * Math.PI * 2;
          
          for (let i = 0; i < pointCount / (mandalaTiers * petals); i++) {
            const t = i / (pointCount / (mandalaTiers * petals));
            const r = tierRadius * (1 + 0.1 * Math.sin(t * Math.PI * 8));
            
            const point = [];
            for (let d = 0; d < dimensions; d++) {
              if (d === 0) {
                point.push(r * Math.cos(angle + time * rotationSpeed * (tier + 1) * 0.1));
              } else if (d === 1) {
                point.push(r * Math.sin(angle + time * rotationSpeed * (tier + 1) * 0.1));
              } else {
                const harmonic = Math.pow(2, (d - 2) / 12);
                point.push(Math.sin(time * soundFrequency * harmonic / 100 + angle * (d + 1)) * tierRadius);
              }
            }
            points.push(point);
          }
        }
      }
    };
    
    // OM symbol wave pattern
    const generateOmWave = () => {
      for (let i = 0; i < pointCount; i++) {
        const t = (i / pointCount) * Math.PI * 4;
        const point = [];
        
        for (let d = 0; d < dimensions; d++) {
          const harmonic = harmonicOrder * (d + 1);
          const freq = soundFrequency * harmonic / 100;
          const phase = phaseOffset + (d * Math.PI / dimensions);
          
          // Standing wave with overtones
          let value = 0;
          for (let h = 1; h <= harmonicOrder; h++) {
            value += (1 / h) * Math.sin(t * h * freq + phase + time * rotationSpeed) * 
                     Math.cos(time * h * 0.5);
          }
          
          point.push(value * amplitudeScale);
        }
        
        points.push(point);
      }
    };
    
    // Lotus mandala (Padma)
    const generateLotusMandala = () => {
      const petalCount = 8 * mandalaTiers; // 8, 16, 24... petals
      
      for (let i = 0; i < pointCount; i++) {
        const t = (i / pointCount) * Math.PI * 2;
        const r = 0.5 + 0.5 * Math.sin(t * petalCount / 2);
        
        const point = [];
        for (let d = 0; d < dimensions; d++) {
          if (d === 0) {
            point.push(r * Math.cos(t + time * rotationSpeed * 0.2));
          } else if (d === 1) {
            point.push(r * Math.sin(t + time * rotationSpeed * 0.2));
          } else {
            const spiralPhase = t * (d + 1) + time;
            point.push(Math.sin(spiralPhase) * Math.cos(spiralPhase * 0.5) * r);
          }
        }
        
        points.push(point);
      }
    };
    
    // Chakra visualization
    const generateChakraField = () => {
      const chakraFreq = chakraFrequencies[chakraAlignment];
      
      for (let i = 0; i < pointCount; i++) {
        const angle = (i / pointCount) * Math.PI * 2 * 7; // 7 chakras
        const radius = 0.3 + 0.7 * ((i % (pointCount / 7)) / (pointCount / 7));
        
        const point = [];
        for (let d = 0; d < dimensions; d++) {
          const harmonic = Math.pow(2, d / 7); // Chakra harmonic series
          const freq = (chakraFreq * harmonic) / 100;
          
          if (d < 2) {
            const r = radius * (1 + 0.3 * Math.sin(time * freq));
            point.push(r * (d === 0 ? Math.cos(angle) : Math.sin(angle)));
          } else {
            point.push(Math.sin(time * freq + angle * (d + 1)) * radius);
          }
        }
        
        points.push(point);
      }
    };
    
    // Execute geometry generation
    switch (geometryType) {
      case 'sri_yantra': generateSriYantra(); break;
      case 'mandala': generateMandala(); break;
      case 'om_wave': generateOmWave(); break;
      case 'lotus': generateLotusMandala(); break;
      case 'chakra': generateChakraField(); break;
      default: generateMandala();
    }
    
    const computeTime = performance.now() - startTime;
    return { points, computeTime };
  }, [dimensions, pointCount, geometryType, time, soundFrequency, 
      harmonicOrder, mandalaTiers, chakraAlignment, rotationSpeed, 
      amplitudeScale, phaseOffset]);

  /**
   * Project N-dimensional points to 2D with rotation
   */
  const projectTo2D = (point) => {
    let rotated = [...point];
    
    // Multi-dimensional rotation
    for (let i = 0; i < dimensions - 1; i++) {
      for (let j = i + 1; j < dimensions; j++) {
        const angle = time * rotationSpeed * (i + j + 1) * 0.08;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        
        const vi = rotated[i];
        const vj = rotated[j];
        
        rotated[i] = vi * cos - vj * sin;
        rotated[j] = vi * sin + vj * cos;
      }
    }
    
    // Perspective projection
    if (projectionMode === 'perspective') {
      const focalLength = 3;
      const depth = dimensions > 2 ? rotated[2] + focalLength : focalLength;
      const scale = focalLength / Math.max(depth, 0.1);
      
      return {
        x: rotated[0] * scale,
        y: rotated[1] * scale,
        depth: depth,
        original: rotated
      };
    } else {
      return {
        x: rotated[0],
        y: rotated[1],
        depth: dimensions > 2 ? rotated[2] : 0,
        original: rotated
      };
    }
  };

  /**
   * Calculate advanced wave properties
   */
  const calculateWaveProperties = (point) => {
    const magnitude = Math.sqrt(point.reduce((sum, val) => sum + val * val, 0));
    const amplitude = magnitude * amplitudeScale;
    
    // Calculate phase from dimensional components
    let phase = 0;
    for (let i = 0; i < point.length; i++) {
      phase += Math.atan2(point[i], point[(i + 1) % point.length]);
    }
    
    // Frequency based on dimensional velocity
    let velocity = 0;
    for (let i = 1; i < point.length; i++) {
      velocity += Math.abs(point[i] - point[i - 1]);
    }
    
    const frequency = soundFrequency * (1 + velocity);
    
    return { amplitude, phase, frequency, magnitude };
  };

  /**
   * Convert temperature/intensity to color (thermal scale)
   */
  const getThermalColor = (value, alpha = 1) => {
    const normalized = Math.max(0, Math.min(1, value));
    
    if (colorMode === 'thermal') {
      // Black -> Blue -> Cyan -> Green -> Yellow -> Red -> White
      if (normalized < 0.2) {
        const t = normalized / 0.2;
        return `rgba(${Math.floor(t * 100)}, ${Math.floor(t * 100)}, ${Math.floor(100 + t * 155)}, ${alpha})`;
      } else if (normalized < 0.4) {
        const t = (normalized - 0.2) / 0.2;
        return `rgba(${Math.floor(t * 100)}, ${Math.floor(100 + t * 155)}, ${Math.floor(255 - t * 100)}, ${alpha})`;
      } else if (normalized < 0.6) {
        const t = (normalized - 0.4) / 0.2;
        return `rgba(${Math.floor(100 + t * 155)}, ${Math.floor(255 - t * 155)}, ${Math.floor(155 - t * 155)}, ${alpha})`;
      } else if (normalized < 0.8) {
        const t = (normalized - 0.6) / 0.2;
        return `rgba(${255}, ${Math.floor(255 - t * 155)}, ${Math.floor(t * 100)}, ${alpha})`;
      } else {
        const t = (normalized - 0.8) / 0.2;
        return `rgba(${255}, ${Math.floor(100 + t * 155)}, ${Math.floor(100 + t * 155)}, ${alpha})`;
      }
    } else if (colorMode === 'spectral') {
      // Wavelength-based spectral colors
      const wavelength = 380 + normalized * 400;
      return wavelengthToRGB(wavelength, alpha);
    } else {
      // Monochrome
      const intensity = Math.floor(normalized * 255);
      return `rgba(${intensity}, ${intensity}, ${intensity}, ${alpha})`;
    }
  };

  /**
   * Convert wavelength to RGB (for spectral mode)
   */
  const wavelengthToRGB = (wavelength, alpha = 1) => {
    let r, g, b;
    
    if (wavelength >= 380 && wavelength < 440) {
      r = -(wavelength - 440) / (440 - 380);
      g = 0;
      b = 1;
    } else if (wavelength >= 440 && wavelength < 490) {
      r = 0;
      g = (wavelength - 440) / (490 - 440);
      b = 1;
    } else if (wavelength >= 490 && wavelength < 510) {
      r = 0;
      g = 1;
      b = -(wavelength - 510) / (510 - 490);
    } else if (wavelength >= 510 && wavelength < 580) {
      r = (wavelength - 510) / (580 - 510);
      g = 1;
      b = 0;
    } else if (wavelength >= 580 && wavelength < 645) {
      r = 1;
      g = -(wavelength - 645) / (645 - 580);
      b = 0;
    } else if (wavelength >= 645 && wavelength <= 780) {
      r = 1;
      g = 0;
      b = 0;
    } else {
      r = 0.5;
      g = 0.5;
      b = 0.5;
    }
    
    return `rgba(${Math.floor(r * 255)}, ${Math.floor(g * 255)}, ${Math.floor(b * 255)}, ${alpha})`;
  };

  /**
   * Calculate advanced analytics metrics
   */
  const calculateAnalytics = (projected, computeTime) => {
    const amplitudes = projected.map(p => p.amplitude);
    const phases = projected.map(p => p.phase);
    
    // Basic statistics
    const avgAmplitude = amplitudes.reduce((a, b) => a + b, 0) / amplitudes.length;
    const maxAmplitude = Math.max(...amplitudes);
    const minAmplitude = Math.min(...amplitudes);
    
    const variance = amplitudes.reduce((sum, val) => sum + Math.pow(val - avgAmplitude, 2), 0) / amplitudes.length;
    const stdDeviation = Math.sqrt(variance);
    
    // Frequency analysis
    const frequencies = projected.map(p => p.frequency);
    const avgFrequency = frequencies.reduce((a, b) => a + b, 0) / frequencies.length;
    const dominantFrequency = frequencies.reduce((a, b, i, arr) => {
      const count = arr.filter(f => Math.abs(f - b) < 10).length;
      return count > a.count ? { freq: b, count } : a;
    }, { freq: 0, count: 0 }).freq;
    
    // Harmonic analysis
    const harmonicRatio = avgFrequency / soundFrequency;
    
    // Phase coherence (0-1, higher = more coherent)
    let phaseCoherence = 0;
    for (let i = 1; i < phases.length; i++) {
      const phaseDiff = Math.abs(phases[i] - phases[i - 1]);
      phaseCoherence += Math.cos(phaseDiff);
    }
    phaseCoherence = (phaseCoherence / (phases.length - 1) + 1) / 2;
    
    // Geometric symmetry index
    let symmetryIndex = 0;
    const centerPoint = projected.reduce((acc, p) => ({
      x: acc.x + p.x / projected.length,
      y: acc.y + p.y / projected.length
    }), { x: 0, y: 0 });
    
    const distances = projected.map(p => 
      Math.sqrt(Math.pow(p.x - centerPoint.x, 2) + Math.pow(p.y - centerPoint.y, 2))
    );
    const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length;
    const distanceVariance = distances.reduce((sum, d) => sum + Math.pow(d - avgDistance, 2), 0) / distances.length;
    symmetryIndex = 1 - Math.min(1, Math.sqrt(distanceVariance) / avgDistance);
    
    // Fractal dimension (box-counting approximation)
    const fractalDimension = 1.5 + (stdDeviation / maxAmplitude) * 0.5;
    
    // Spatial entropy
    const gridSize = 20;
    const grid = Array(gridSize).fill(0).map(() => Array(gridSize).fill(0));
    projected.forEach(p => {
      const x = Math.floor((p.x + 2) * gridSize / 4);
      const y = Math.floor((p.y + 2) * gridSize / 4);
      if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
        grid[x][y]++;
      }
    });
    
    let spatialEntropy = 0;
    const total = projected.length;
    grid.forEach(row => {
      row.forEach(count => {
        if (count > 0) {
          const p = count / total;
          spatialEntropy -= p * Math.log2(p);
        }
      });
    });
    
    // Vedic metrics
    const nadaResonance = phaseCoherence * harmonicRatio;
    const chakraAlignmentScore = 1 - Math.abs(dominantFrequency - chakraFrequencies[chakraAlignment]) / chakraFrequencies[chakraAlignment];
    const mantricHarmony = symmetryIndex * phaseCoherence;
    
    return {
      avgAmplitude: avgAmplitude.toFixed(4),
      maxAmplitude: maxAmplitude.toFixed(4),
      minAmplitude: minAmplitude.toFixed(4),
      stdDeviation: stdDeviation.toFixed(4),
      dominantFrequency: dominantFrequency.toFixed(2),
      harmonicRatio: harmonicRatio.toFixed(3),
      phaseCoherence: phaseCoherence.toFixed(3),
      symmetryIndex: symmetryIndex.toFixed(3),
      fractalDimension: fractalDimension.toFixed(3),
      spatialEntropy: spatialEntropy.toFixed(3),
      nadaResonance: nadaResonance.toFixed(3),
      chakraAlignment: chakraAlignmentScore.toFixed(3),
      mantricHarmony: mantricHarmony.toFixed(3),
      computeTime: computeTime.toFixed(2),
      particleCount: projected.length,
      fps: (1000 / Math.max(computeTime, 1)).toFixed(1)
    };
  };

  /**
   * Main render function
   */
  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) * 0.3;
    
    // Clear with black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      
      for (let i = -10; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX + i * scale * 0.3, 0);
        ctx.lineTo(centerX + i * scale * 0.3, height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, centerY + i * scale * 0.3);
        ctx.lineTo(width, centerY + i * scale * 0.3);
        ctx.stroke();
      }
    }
    
    // Draw dimensional axes
    if (showAxes) {
      ctx.lineWidth = 2;
      
      for (let d = 0; d < Math.min(dimensions, 6); d++) {
        const axis = new Array(dimensions).fill(0);
        axis[d] = 1.5;
        
        const projected = projectTo2D(axis);
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 - d * 0.04})`;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + projected.x * scale, centerY + projected.y * scale);
        ctx.stroke();
        
        // Axis label
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 - d * 0.06})`;
        ctx.font = '11px monospace';
        ctx.fillText(`D${d}`, centerX + projected.x * scale + 8, centerY + projected.y * scale - 8);
      }
    }
    
    // Generate and process points
    const { points, computeTime } = generateSacredGeometry;
    const projected = points.map(p => {
      const proj = projectTo2D(p);
      const wave = calculateWaveProperties(p);
      return { ...proj, ...wave };
    });
    
    // Sort by depth for proper rendering
    projected.sort((a, b) => b.depth - a.depth);
    
    // Render mandala background if enabled
    if (showMandala && geometryType === 'mandala') {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      for (let r = 0.5; r <= 2; r += 0.25) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r * scale, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    
    // Render points
    projected.forEach((p, idx) => {
      const x = centerX + p.x * scale;
      const y = centerY + p.y * scale;
      
      if (x < -50 || x > width + 50 || y < -50 || y > height + 50) return;
      
      const normalizedAmp = Math.min(1, p.amplitude / 2);
      const color = getThermalColor(normalizedAmp);
      const size = Math.max(1, normalizedAmp * 4 + 1);
      const alpha = Math.max(0.3, 1 - Math.abs(p.depth) / 6);
      
      // Main point
      ctx.fillStyle = color.replace(/[\d.]+\)$/g, `${alpha})`);
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Glow for high amplitude
      if (normalizedAmp > 0.7) {
        ctx.globalAlpha = alpha * 0.15;
        ctx.beginPath();
        ctx.arc(x, y, size * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      
      // Connect nearby points for wave visualization
      if (showWaveform && idx % 5 === 0) {
        const nextIdx = (idx + 5) % projected.length;
        const next = projected[nextIdx];
        const nextX = centerX + next.x * scale;
        const nextY = centerY + next.y * scale;
        
        const dist = Math.sqrt(Math.pow(nextX - x, 2) + Math.pow(nextY - y, 2));
        if (dist < scale * 0.3) {
          ctx.strokeStyle = color.replace(/[\d.]+\)$/g, `${alpha * 0.2})`);
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(nextX, nextY);
          ctx.stroke();
        }
      }
    });
    
    // Calculate and update analytics
    const analyticsData = calculateAnalytics(projected, computeTime);
    setAnalytics(analyticsData);
  };

  /**
   * Animation loop with performance monitoring
   */
  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsUpdateTime = lastTime;
    
    const animate = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      if (isPlaying) {
        setTime(t => t + 0.016);
      }
      
      render();
      
      frameCount++;
      if (currentTime - fpsUpdateTime >= 1000) {
        fpsUpdateTime = currentTime;
        frameCount = 0;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, dimensions, pointCount, geometryType, projectionMode, 
      soundFrequency, harmonicOrder, mandalaTiers, chakraAlignment,
      rotationSpeed, amplitudeScale, phaseOffset, showGrid, showAxes, 
      showWaveform, showMandala, colorMode, time, resonanceMode]);

  /**
   * Handle canvas resize
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleReset = () => {
    setTime(0);
    setRotationSpeed(0.5);
    setAmplitudeScale(1.0);
    setPhaseOffset(0);
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `sacred_geometry_${geometryType}_${dimensions}d_${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden font-mono">
      <div className="flex h-full">
        {/* Left Control Panel */}
        <div className="w-80 bg-gradient-to-br from-gray-900/90 to-black/95 backdrop-blur-xl border-r border-white/10 overflow-y-auto">
          <div className="p-4 space-y-3">
            {/* Header */}
            <div className="border-b border-white/10 pb-3">
              <h1 className="text-lg font-bold text-white flex items-center gap-2">
                <Radio size={18} className="text-white" />
                NĀDA VISUALIZER
              </h1>
              <p className="text-[10px] text-gray-400 mt-1">VEDIC SOUND GEOMETRY ENGINE v3.0</p>
            </div>

            {/* Sacred Geometry Selection */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2.5">
              <label className="text-[10px] text-gray-300 mb-1.5 block font-semibold">SACRED GEOMETRY</label>
              <select 
                value={geometryType}
                onChange={(e) => setGeometryType(e.target.value)}
                className="w-full bg-black/50 border border-white/20 rounded px-2 py-1.5 text-xs text-white focus:border-white/40 focus:outline-none"
              >
                <option value="sri_yantra">SRI YANTRA (श्री यन्त्र)</option>
                <option value="mandala">MANDALA (मण्डल)</option>
                <option value="om_wave">OM WAVE (ॐ)</option>
                <option value="lotus">LOTUS/PADMA (पद्म)</option>
                <option value="chakra">CHAKRA FIELD (चक्र)</option>
              </select>
            </div>

            {/* Dimensions Control */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2.5">
              <label className="text-[10px] text-gray-300 mb-1.5 block font-semibold">
                DIMENSIONS: <span className="text-white float-right">{dimensions}D</span>
              </label>
              <input 
                type="range" 
                min="2" 
                max="10" 
                value={dimensions}
                onChange={(e) => setDimensions(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, white ${(dimensions-2)/8*100}%, rgba(255,255,255,0.1) ${(dimensions-2)/8*100}%)`
                }}
              />
            </div>

            {/* Point Density */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2.5">
              <label className="text-[10px] text-gray-300 mb-1.5 block font-semibold">
                PARTICLE DENSITY: <span className="text-white float-right">{pointCount}</span>
              </label>
              <input 
                type="range" 
                min="100" 
                max="5000" 
                step="100"
                value={pointCount}
                onChange={(e) => setPointCount(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer"
              />
            </div>

            {/* Vedic Sound Parameters */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2.5">
              <div className="flex items-center gap-2 mb-2">
                <Waves size={14} className="text-white" />
                <label className="text-[10px] text-gray-300 font-semibold">NĀDA (नाद) FREQUENCY</label>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    min="200" 
                    max="1000" 
                    value={soundFrequency}
                    onChange={(e) => setSoundFrequency(parseInt(e.target.value))}
                    className="flex-1 bg-black/50 border border-white/20 rounded px-2 py-1 text-xs text-white focus:border-white/40 focus:outline-none"
                  />
                  <span className="text-[10px] text-gray-400">Hz</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setSoundFrequency(432)} className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded px-2 py-1 text-[9px]">432Hz</button>
                  <button onClick={() => setSoundFrequency(528)} className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded px-2 py-1 text-[9px]">528Hz</button>
                  <button onClick={() => setSoundFrequency(396)} className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded px-2 py-1 text-[9px]">396Hz</button>
                </div>
              </div>
            </div>

            {/* Chakra Alignment */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2.5">
              <label className="text-[10px] text-gray-300 mb-1.5 block font-semibold">CHAKRA ALIGNMENT (चक्र)</label>
              <select 
                value={chakraAlignment}
                onChange={(e) => setChakraAlignment(e.target.value)}
                className="w-full bg-black/50 border border-white/20 rounded px-2 py-1.5 text-xs text-white focus:border-white/40 focus:outline-none"
              >
                <option value="muladhara">MULADHARA (मूलाधार) - 256Hz</option>
                <option value="svadhisthana">SVADHISTHANA (स्वाधिष्ठान) - 288Hz</option>
                <option value="manipura">MANIPURA (मणिपुर) - 320Hz</option>
                <option value="anahata">ANAHATA (अनाहत) - 341Hz</option>
                <option value="vishuddha">VISHUDDHA (विशुद्ध) - 384Hz</option>
                <option value="ajna">AJNA (आज्ञा) - 426Hz</option>
                <option value="sahasrara">SAHASRARA (सहस्रार) - 480Hz</option>
              </select>
            </div>

            {/* Harmonic Order */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2.5">
              <label className="text-[10px] text-gray-300 mb-1.5 block font-semibold">
                HARMONIC ORDER: <span className="text-white float-right">{harmonicOrder}</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="8" 
                value={harmonicOrder}
                onChange={(e) => setHarmonicOrder(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer"
              />
            </div>

            {/* Mandala Tiers */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2.5">
              <label className="text-[10px] text-gray-300 mb-1.5 block font-semibold">
                MANDALA TIERS: <span className="text-white float-right">{mandalaTiers}</span>
              </label>
              <input 
                type="range" 
                min="3" 
                max="12" 
                value={mandalaTiers}
                onChange={(e) => setMandalaTiers(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer"
              />
            </div>

            {/* Wave Properties */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2.5">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={14} className="text-white" />
                <label className="text-[10px] text-gray-300 font-semibold">WAVE PROPERTIES</label>
              </div>
              
              <div className="space-y-2">
                <div>
                  <label className="text-[9px] text-gray-400 block mb-1">
                    AMPLITUDE SCALE: {amplitudeScale.toFixed(2)}
                  </label>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="3" 
                    step="0.1"
                    value={amplitudeScale}
                    onChange={(e) => setAmplitudeScale(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer"
                  />
                </div>
                
                <div>
                  <label className="text-[9px] text-gray-400 block mb-1">
                    ROTATION SPEED: {rotationSpeed.toFixed(2)}
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="2" 
                    step="0.1"
                    value={rotationSpeed}
                    onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-gray-400 block mb-1">
                    PHASE OFFSET: {phaseOffset.toFixed(2)}
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="6.28" 
                    step="0.1"
                    value={phaseOffset}
                    onChange={(e) => setPhaseOffset(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Projection Mode */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2.5">
              <label className="text-[10px] text-gray-300 mb-1.5 block font-semibold">PROJECTION MODE</label>
              <select 
                value={projectionMode}
                onChange={(e) => setProjectionMode(e.target.value)}
                className="w-full bg-black/50 border border-white/20 rounded px-2 py-1.5 text-xs text-white focus:border-white/40 focus:outline-none"
              >
                <option value="perspective">PERSPECTIVE</option>
                <option value="orthographic">ORTHOGRAPHIC</option>
              </select>
            </div>

            {/* Color Mode */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2.5">
              <label className="text-[10px] text-gray-300 mb-1.5 block font-semibold">COLOR MAPPING</label>
              <select 
                value={colorMode}
                onChange={(e) => setColorMode(e.target.value)}
                className="w-full bg-black/50 border border-white/20 rounded px-2 py-1.5 text-xs text-white focus:border-white/40 focus:outline-none"
              >
                <option value="thermal">THERMAL (HOT/COLD)</option>
                <option value="spectral">SPECTRAL (WAVELENGTH)</option>
                <option value="monochrome">MONOCHROME</option>
              </select>
            </div>

            {/* Display Toggles */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2.5">
              <label className="text-[10px] text-gray-300 mb-2 block font-semibold">DISPLAY OPTIONS</label>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-[10px] cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showGrid}
                    onChange={(e) => setShowGrid(e.target.checked)}
                    className="accent-white"
                  />
                  <span>COORDINATE GRID</span>
                </label>
                <label className="flex items-center gap-2 text-[10px] cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showAxes}
                    onChange={(e) => setShowAxes(e.target.checked)}
                    className="accent-white"
                  />
                  <span>DIMENSIONAL AXES</span>
                </label>
                <label className="flex items-center gap-2 text-[10px] cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showWaveform}
                    onChange={(e) => setShowWaveform(e.target.checked)}
                    className="accent-white"
                  />
                  <span>WAVE CONNECTIONS</span>
                </label>
                <label className="flex items-center gap-2 text-[10px] cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showMandala}
                    onChange={(e) => setShowMandala(e.target.checked)}
                    className="accent-white"
                  />
                  <span>MANDALA RINGS</span>
                </label>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1 bg-white/90 hover:bg-white text-black px-3 py-2 rounded text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                {isPlaying ? 'PAUSE' : 'PLAY'}
              </button>
              <button 
                onClick={handleReset}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 py-2 rounded text-xs flex items-center justify-center transition-all"
                title="Reset"
              >
                <RotateCcw size={14} />
              </button>
              <button 
                onClick={handleExport}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 py-2 rounded text-xs flex items-center justify-center transition-all"
                title="Export PNG"
              >
                <Download size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Visualization Area */}
        <div className="flex-1 flex flex-col">
          <canvas 
            ref={canvasRef}
            className="flex-1 w-full bg-black"
          />
          
          {/* Bottom Analytics Panel */}
          <div className="bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-xl border-t border-white/10 p-3">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={14} className="text-white" />
              <h2 className="text-[10px] text-gray-300 font-bold tracking-wider">ANALYTICAL METRICS</h2>
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-[9px] text-gray-500">REAL-TIME COMPUTE</span>
            </div>
            
            {/* Primary Metrics */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2">
                <div className="text-[9px] text-gray-400 mb-0.5">AVG AMPLITUDE</div>
                <div className="text-sm font-bold text-white">{analytics.avgAmplitude}</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2">
                <div className="text-[9px] text-gray-400 mb-0.5">MAX AMPLITUDE</div>
                <div className="text-sm font-bold text-white">{analytics.maxAmplitude}</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2">
                <div className="text-[9px] text-gray-400 mb-0.5">STD DEVIATION</div>
                <div className="text-sm font-bold text-white">{analytics.stdDeviation}</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2">
                <div className="text-[9px] text-gray-400 mb-0.5">PHASE COHERENCE</div>
                <div className="text-sm font-bold text-white">{analytics.phaseCoherence}</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2">
                <div className="text-[9px] text-gray-400 mb-0.5">SYMMETRY INDEX</div>
                <div className="text-sm font-bold text-white">{analytics.symmetryIndex}</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2">
                <div className="text-[9px] text-gray-400 mb-0.5">FRACTAL DIM</div>
                <div className="text-sm font-bold text-white">{analytics.fractalDimension}</div>
              </div>
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2">
                <div className="text-[9px] text-gray-400 mb-0.5">DOMINANT FREQ</div>
                <div className="text-xs font-bold text-white">{analytics.dominantFrequency} Hz</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2">
                <div className="text-[9px] text-gray-400 mb-0.5">HARMONIC RATIO</div>
                <div className="text-xs font-bold text-white">{analytics.harmonicRatio}</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2">
                <div className="text-[9px] text-gray-400 mb-0.5">SPATIAL ENTROPY</div>
                <div className="text-xs font-bold text-white">{analytics.spatialEntropy}</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2">
                <div className="text-[9px] text-gray-400 mb-0.5">NĀDA RESONANCE</div>
                <div className="text-xs font-bold text-white">{analytics.nadaResonance}</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2">
                <div className="text-[9px] text-gray-400 mb-0.5">CHAKRA ALIGN</div>
                <div className="text-xs font-bold text-white">{analytics.chakraAlignment}</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded p-2">
                <div className="text-[9px] text-gray-400 mb-0.5">MANTRIC HARMONY</div>
                <div className="text-xs font-bold text-white">{analytics.mantricHarmony}</div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="flex items-center gap-4 text-[9px] text-gray-500">
              <div className="flex items-center gap-1">
                <Zap size={10} />
                <span>PARTICLES: {analytics.particleCount}</span>
              </div>
              <div className="w-px h-3 bg-white/10"></div>
              <span>COMPUTE: {analytics.computeTime}ms</span>
              <div className="w-px h-3 bg-white/10"></div>
              <span>FPS: {analytics.fps}</span>
              <div className="w-px h-3 bg-white/10"></div>
              <span>TIME: {(time * 1000).toFixed(0)}ms</span>
              <div className="flex-1"></div>
              <span className="text-gray-600">ENGINE: WEBGL CANVAS | STATUS: ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NDimensionalVisualizer;
