export interface HSEMetrics {
  LTIFR: number;
  LTISR: number;
  ART: number;
  EMERGENCY: number;
  LEADERSHIP: number;
  ENVIRONMENT_SUSTAINABILITY: number;
  TRAINING: number;
  AWARDS: number;
  CAMPAIGNS: number;
}

export function calculateHSEMetrics(): HSEMetrics {
  // Initialize metrics
  const metrics: HSEMetrics = {
    LTIFR: 0,
    LTISR: 0,
    ART: 0,
    EMERGENCY: 0,
    LEADERSHIP: 0,
    ENVIRONMENT_SUSTAINABILITY: 0,
    TRAINING: 0,
    AWARDS: 0,
    CAMPAIGNS: 0,
  };

  try {
    // Calculate LTIFR and LTISR from injury details
    const injuryDetails = JSON.parse(localStorage.getItem('injury_details') || '[]');
    const ltiRecords = injuryDetails.filter((record: any) => record.isLTI === true);
    const totalTimeOffDays = injuryDetails.reduce((sum: number, record: any) => {
      return sum + (parseInt(record.timeOffDays) || 0);
    }, 0);

    // Assuming 100,000 hours worked per year for frequency rate calculations
    const hoursWorked = 100000;
    metrics.LTIFR = ltiRecords.length > 0 ? (ltiRecords.length / hoursWorked) * 100000 : 0;
    metrics.LTISR = totalTimeOffDays > 0 ? (totalTimeOffDays / hoursWorked) * 100000 : 0;

    // Calculate EMERGENCY from incident reports
    const incidentReports = JSON.parse(localStorage.getItem('incident_report') || '[]');
    metrics.EMERGENCY = incidentReports.length;

    // Calculate TRAINING from various training records
    const trainingRecords = JSON.parse(localStorage.getItem('training_records') || '[]');
    const inductionRecords = JSON.parse(localStorage.getItem('induction_records') || '[]');
    const competencyRecords = JSON.parse(localStorage.getItem('training_competency_register') || '[]');

    metrics.TRAINING = trainingRecords.length + inductionRecords.length + competencyRecords.length;

    // Calculate AWARDS (assuming some training records are awards/certifications)
    const awardRecords = trainingRecords.filter((record: any) =>
      record.trainingType?.toLowerCase().includes('award') ||
      record.trainingType?.toLowerCase().includes('certification') ||
      record.competencyLevel === 'Expert'
    );
    metrics.AWARDS = awardRecords.length;

    // Calculate CAMPAIGNS from events and observations
    const eventRecords = JSON.parse(localStorage.getItem('event_records') || '[]');
    const observationRecords = JSON.parse(localStorage.getItem('observation_tracker') || '[]');

    const campaignEvents = eventRecords.filter((record: any) =>
      record.eventType?.toLowerCase().includes('campaign') ||
      record.eventType?.toLowerCase().includes('safety') ||
      record.eventType?.toLowerCase().includes('awareness')
    );

    const campaignObservations = observationRecords.filter((record: any) =>
      record.category?.toLowerCase().includes('campaign') ||
      record.description?.toLowerCase().includes('campaign')
    );

    metrics.CAMPAIGNS = campaignEvents.length + campaignObservations.length;

    // Calculate ART (Accident Report Rate) - total incidents per 100,000 hours
    const totalIncidents = injuryDetails.length + incidentReports.length;
    metrics.ART = totalIncidents > 0 ? (totalIncidents / hoursWorked) * 100000 : 0;

    // Calculate LEADERSHIP (from NCRs resolved or management actions)
    const ncrRecords = JSON.parse(localStorage.getItem('ncr_register') || '[]');
    const resolvedNCRs = ncrRecords.filter((record: any) => record.status === 'Closed');
    metrics.LEADERSHIP = resolvedNCRs.length;

    // Calculate ENVIRONMENT & SUSTAINABILITY (from observations related to environment)
    const envObservations = observationRecords.filter((record: any) =>
      record.category?.toLowerCase().includes('environment') ||
      record.category?.toLowerCase().includes('sustainability') ||
      record.description?.toLowerCase().includes('environment')
    );
    metrics.ENVIRONMENT_SUSTAINABILITY = envObservations.length;

  } catch (error) {
    console.error('Error calculating HSE metrics:', error);
  }

  return metrics;
}