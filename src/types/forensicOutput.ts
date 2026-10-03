export type PredictionVerdict = 'REAL' | 'FAKE' | 'UNCERTAIN' | 'MANIPULATED' | 'HIGH_RISK_FRAUD' | 'AI_GENERATED' | 'AUTHENTIC';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

// Video Schemas
export interface SuspiciousInterval {
  time_frame: string;
  start_timestamp: string;
  end_timestamp: string;
  start_seconds: number;
  end_seconds: number;
  type: string; // e.g., 'visual_anomaly', 'lip_sync_delta', 'vocoder_phase'
  score: number; // 0.0 - 1.0
}

export interface FrameTimelinePoint {
  frame_index: number;
  timestamp: string;
  timestamp_seconds: number;
  time_frame: string;
  fake_probability: number; // 0.0 - 1.0
  is_suspicious: boolean;
}

export interface VideoForensicReport {
  id: string;
  case_number: string;
  title: string;
  description: string;
  category: 'VIDEO' | 'AUDIO' | 'IMAGE' | 'SCAM_AD';
  risk_level: RiskLevel;
  
  video_path?: string;
  video_stream_url?: string;
  video_duration_seconds?: number;

  timestamp?: string;
  timestamp_seconds?: number;
  peak_anomaly_timestamp?: string;
  analysis_timestamp: string;

  time_frame?: string;
  suspicious_time_frame?: string;
  video_time_frame?: string;

  prediction: PredictionVerdict;
  deepfake?: {
    probability: number; // 0.0 - 1.0
  };

  suspicious_intervals?: SuspiciousInterval[];
  frame_level_timeline?: FrameTimelinePoint[];

  // Audio specific payload (exact match to user schema)
  audio_duration_seconds?: number;
  ai_probability?: number;
  confidence?: 'HIGH' | 'MEDIUM' | 'LOW';
  timeline?: AudioTimelinePoint[];
  suspicious_segments?: AudioSuspiciousSegment[];
  audio_url?: string;

  // Optional telemetry details
  target_subject?: string;
  platform?: string;
  sha256_checksum?: string;
}

// Audio Specific Schema (Exact User Format)
export interface AudioTimelinePoint {
  timestamp_seconds: number;
  ai_probability: number; // 0.0 - 1.0
}

export interface AudioSuspiciousSegment {
  start_seconds: number;
  end_seconds: number;
  ai_probability: number; // 0.0 - 1.0
}

export interface AudioForensicOutput {
  audio_duration_seconds: number;
  prediction: 'AI_GENERATED' | 'REAL' | 'AUTHENTIC' | 'FAKE' | 'UNCERTAIN';
  ai_probability: number;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  timeline: AudioTimelinePoint[];
  suspicious_segments: AudioSuspiciousSegment[];
}
