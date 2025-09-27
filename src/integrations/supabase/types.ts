export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      cnr_tracker: {
        Row: {
          actualdateofclosure: string | null
          areasection: string | null
          daystoclose: number | null
          description: string | null
          id: number
          issueddate: string | null
          location: string | null
          proposeddateofclosure: string | null
          reference: string | null
          remarks: string | null
          responsiblecompanyname: string | null
          responsibledept: string | null
          source: string | null
          srno: number | null
          status: string | null
          subject: string | null
          typeinternalexternal: string | null
          typeofncr: string | null
        }
        Insert: {
          actualdateofclosure?: string | null
          areasection?: string | null
          daystoclose?: number | null
          description?: string | null
          id?: number
          issueddate?: string | null
          location?: string | null
          proposeddateofclosure?: string | null
          reference?: string | null
          remarks?: string | null
          responsiblecompanyname?: string | null
          responsibledept?: string | null
          source?: string | null
          srno?: number | null
          status?: string | null
          subject?: string | null
          typeinternalexternal?: string | null
          typeofncr?: string | null
        }
        Update: {
          actualdateofclosure?: string | null
          areasection?: string | null
          daystoclose?: number | null
          description?: string | null
          id?: number
          issueddate?: string | null
          location?: string | null
          proposeddateofclosure?: string | null
          reference?: string | null
          remarks?: string | null
          responsiblecompanyname?: string | null
          responsibledept?: string | null
          source?: string | null
          srno?: number | null
          status?: string | null
          subject?: string | null
          typeinternalexternal?: string | null
          typeofncr?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          activityleader: string | null
          activityleaderdesignation: string | null
          corporatehse: string | null
          corporatemanagementinvolvement: string | null
          date: string | null
          deptmanagerslead: string | null
          hseteam: string | null
          id: number
          numberofattendees: string | null
          projectdirector: string | null
          projectengineer: string | null
          projectmanager: string | null
          projectseniormanagementinvolvement: string | null
          remarks: string | null
          siteengineer: string | null
          srno: string | null
          supervisors: string | null
          titletopic: string | null
          topmanagement: string | null
          typeofactivity: string | null
        }
        Insert: {
          activityleader?: string | null
          activityleaderdesignation?: string | null
          corporatehse?: string | null
          corporatemanagementinvolvement?: string | null
          date?: string | null
          deptmanagerslead?: string | null
          hseteam?: string | null
          id?: number
          numberofattendees?: string | null
          projectdirector?: string | null
          projectengineer?: string | null
          projectmanager?: string | null
          projectseniormanagementinvolvement?: string | null
          remarks?: string | null
          siteengineer?: string | null
          srno?: string | null
          supervisors?: string | null
          titletopic?: string | null
          topmanagement?: string | null
          typeofactivity?: string | null
        }
        Update: {
          activityleader?: string | null
          activityleaderdesignation?: string | null
          corporatehse?: string | null
          corporatemanagementinvolvement?: string | null
          date?: string | null
          deptmanagerslead?: string | null
          hseteam?: string | null
          id?: number
          numberofattendees?: string | null
          projectdirector?: string | null
          projectengineer?: string | null
          projectmanager?: string | null
          projectseniormanagementinvolvement?: string | null
          remarks?: string | null
          siteengineer?: string | null
          srno?: string | null
          supervisors?: string | null
          titletopic?: string | null
          topmanagement?: string | null
          typeofactivity?: string | null
        }
        Relationships: []
      }
      incident_report: {
        Row: {
          details: string | null
          id: number
          incidentdate: string | null
          reportref: string | null
          section: string | null
          srno: string | null
          time: string | null
        }
        Insert: {
          details?: string | null
          id?: number
          incidentdate?: string | null
          reportref?: string | null
          section?: string | null
          srno?: string | null
          time?: string | null
        }
        Update: {
          details?: string | null
          id?: number
          incidentdate?: string | null
          reportref?: string | null
          section?: string | null
          srno?: string | null
          time?: string | null
        }
        Relationships: []
      }
      induction_records: {
        Row: {
          company: string | null
          designation: string | null
          id: number
          idno: string | null
          inductedon: string | null
          name: string | null
          nextinduction: string | null
          signature: string | null
          sno: string | null
          status: string | null
        }
        Insert: {
          company?: string | null
          designation?: string | null
          id?: number
          idno?: string | null
          inductedon?: string | null
          name?: string | null
          nextinduction?: string | null
          signature?: string | null
          sno?: string | null
          status?: string | null
        }
        Update: {
          company?: string | null
          designation?: string | null
          id?: number
          idno?: string | null
          inductedon?: string | null
          name?: string | null
          nextinduction?: string | null
          signature?: string | null
          sno?: string | null
          status?: string | null
        }
        Relationships: []
      }
      injury_details: {
        Row: {
          agencysourceofinjuryillness: string | null
          backtoworkdate: string | null
          bodypartinjured: string | null
          emiratesidofip: string | null
          employeeidofip: string | null
          id: number
          incidentdate: string | null
          incidentref: string | null
          ipname: string | null
          ipstatus: string | null
          islti: boolean | null
          mechanismofinjuryillness: string | null
          natureofinjuryillness: string | null
          srno: number | null
          timeoffdays: number | null
          trade: string | null
          typeofinjury: string | null
          weekendingon: string | null
        }
        Insert: {
          agencysourceofinjuryillness?: string | null
          backtoworkdate?: string | null
          bodypartinjured?: string | null
          emiratesidofip?: string | null
          employeeidofip?: string | null
          id?: number
          incidentdate?: string | null
          incidentref?: string | null
          ipname?: string | null
          ipstatus?: string | null
          islti?: boolean | null
          mechanismofinjuryillness?: string | null
          natureofinjuryillness?: string | null
          srno?: number | null
          timeoffdays?: number | null
          trade?: string | null
          typeofinjury?: string | null
          weekendingon?: string | null
        }
        Update: {
          agencysourceofinjuryillness?: string | null
          backtoworkdate?: string | null
          bodypartinjured?: string | null
          emiratesidofip?: string | null
          employeeidofip?: string | null
          id?: number
          incidentdate?: string | null
          incidentref?: string | null
          ipname?: string | null
          ipstatus?: string | null
          islti?: boolean | null
          mechanismofinjuryillness?: string | null
          natureofinjuryillness?: string | null
          srno?: number | null
          timeoffdays?: number | null
          trade?: string | null
          typeofinjury?: string | null
          weekendingon?: string | null
        }
        Relationships: []
      }
      master_register: {
        Row: {
          actualwastegeneration: number | null
          avgtrainingperemployee: number | null
          envincidentmajor: number | null
          envincidentminor: number | null
          envincidentmoderate: number | null
          envsamplingair: boolean | null
          envsamplingnoise: boolean | null
          equipmentpropertydamages: number | null
          expectedwastegeneration: number | null
          fac: number | null
          fatalities: number | null
          fireincidents: number | null
          fuelconsumption: number | null
          hazwastedisposalliquidl: number | null
          hazwastedisposalsolidtonnes: number | null
          hipoincidents: number | null
          id: number
          inductionattendees: number | null
          level1: number | null
          level2: number | null
          level3: number | null
          level4: number | null
          level5: number | null
          lostworkdaycase: number | null
          lostworkdaysillness: number | null
          lostworkdaysinjuries: number | null
          mtc: number | null
          nearmiss: number | null
          nonhazwastedisposall: number | null
          nonhazwastedisposaltonnes: number | null
          noofassessedtrainings: number | null
          noofassessedtrainingsperemployee: number | null
          nooflostworkdays: number | null
          npcmanhours: number | null
          npcmanpower: number | null
          othersubconmanpower: number | null
          othersubconsmanhours: number | null
          ppd: number | null
          ptd: number | null
          rwdc: number | null
          securityincidents: number | null
          seriousdangerousoccurrence: number | null
          totallti: number | null
          totalmanhours: number | null
          totalmanpower: number | null
          totaltraininghours: number | null
          trojanmanhours: number | null
          trojanmanpower: number | null
          wasterecycledpercent: number | null
          waterconsumption: number | null
          weekendingon: string | null
          weeklyhseinspectionscore: number | null
        }
        Insert: {
          actualwastegeneration?: number | null
          avgtrainingperemployee?: number | null
          envincidentmajor?: number | null
          envincidentminor?: number | null
          envincidentmoderate?: number | null
          envsamplingair?: boolean | null
          envsamplingnoise?: boolean | null
          equipmentpropertydamages?: number | null
          expectedwastegeneration?: number | null
          fac?: number | null
          fatalities?: number | null
          fireincidents?: number | null
          fuelconsumption?: number | null
          hazwastedisposalliquidl?: number | null
          hazwastedisposalsolidtonnes?: number | null
          hipoincidents?: number | null
          id?: number
          inductionattendees?: number | null
          level1?: number | null
          level2?: number | null
          level3?: number | null
          level4?: number | null
          level5?: number | null
          lostworkdaycase?: number | null
          lostworkdaysillness?: number | null
          lostworkdaysinjuries?: number | null
          mtc?: number | null
          nearmiss?: number | null
          nonhazwastedisposall?: number | null
          nonhazwastedisposaltonnes?: number | null
          noofassessedtrainings?: number | null
          noofassessedtrainingsperemployee?: number | null
          nooflostworkdays?: number | null
          npcmanhours?: number | null
          npcmanpower?: number | null
          othersubconmanpower?: number | null
          othersubconsmanhours?: number | null
          ppd?: number | null
          ptd?: number | null
          rwdc?: number | null
          securityincidents?: number | null
          seriousdangerousoccurrence?: number | null
          totallti?: number | null
          totalmanhours?: number | null
          totalmanpower?: number | null
          totaltraininghours?: number | null
          trojanmanhours?: number | null
          trojanmanpower?: number | null
          wasterecycledpercent?: number | null
          waterconsumption?: number | null
          weekendingon?: string | null
          weeklyhseinspectionscore?: number | null
        }
        Update: {
          actualwastegeneration?: number | null
          avgtrainingperemployee?: number | null
          envincidentmajor?: number | null
          envincidentminor?: number | null
          envincidentmoderate?: number | null
          envsamplingair?: boolean | null
          envsamplingnoise?: boolean | null
          equipmentpropertydamages?: number | null
          expectedwastegeneration?: number | null
          fac?: number | null
          fatalities?: number | null
          fireincidents?: number | null
          fuelconsumption?: number | null
          hazwastedisposalliquidl?: number | null
          hazwastedisposalsolidtonnes?: number | null
          hipoincidents?: number | null
          id?: number
          inductionattendees?: number | null
          level1?: number | null
          level2?: number | null
          level3?: number | null
          level4?: number | null
          level5?: number | null
          lostworkdaycase?: number | null
          lostworkdaysillness?: number | null
          lostworkdaysinjuries?: number | null
          mtc?: number | null
          nearmiss?: number | null
          nonhazwastedisposall?: number | null
          nonhazwastedisposaltonnes?: number | null
          noofassessedtrainings?: number | null
          noofassessedtrainingsperemployee?: number | null
          nooflostworkdays?: number | null
          npcmanhours?: number | null
          npcmanpower?: number | null
          othersubconmanpower?: number | null
          othersubconsmanhours?: number | null
          ppd?: number | null
          ptd?: number | null
          rwdc?: number | null
          securityincidents?: number | null
          seriousdangerousoccurrence?: number | null
          totallti?: number | null
          totalmanhours?: number | null
          totalmanpower?: number | null
          totaltraininghours?: number | null
          trojanmanhours?: number | null
          trojanmanpower?: number | null
          wasterecycledpercent?: number | null
          waterconsumption?: number | null
          weekendingon?: string | null
          weeklyhseinspectionscore?: number | null
        }
        Relationships: []
      }
      observation_tracker: {
        Row: {
          actionby: string | null
          category: string | null
          contractor: string | null
          dateclosed: string | null
          dateofissue: string | null
          id: number
          location: string | null
          observations: string | null
          recommendations: string | null
          reportrefno: string | null
          risklevel: string | null
          sorno: string | null
          srno: number | null
          status: string | null
          ucua: string | null
        }
        Insert: {
          actionby?: string | null
          category?: string | null
          contractor?: string | null
          dateclosed?: string | null
          dateofissue?: string | null
          id?: number
          location?: string | null
          observations?: string | null
          recommendations?: string | null
          reportrefno?: string | null
          risklevel?: string | null
          sorno?: string | null
          srno?: number | null
          status?: string | null
          ucua?: string | null
        }
        Update: {
          actionby?: string | null
          category?: string | null
          contractor?: string | null
          dateclosed?: string | null
          dateofissue?: string | null
          id?: number
          location?: string | null
          observations?: string | null
          recommendations?: string | null
          reportrefno?: string | null
          risklevel?: string | null
          sorno?: string | null
          srno?: number | null
          status?: string | null
          ucua?: string | null
        }
        Relationships: []
      }
      training_competency_register: {
        Row: {
          certificatereference: string | null
          company: string | null
          dateoftraining: string | null
          designation: string | null
          empideid: string | null
          id: number
          internalexternal: string | null
          name: string | null
          noofattendees: number | null
          score: number | null
          srno: number | null
          trainingcertificatevalidity: string | null
          trainingcoursetitle: string | null
          trainingdurationhrs: number | null
          traininghours: number | null
          trainingprovider: string | null
        }
        Insert: {
          certificatereference?: string | null
          company?: string | null
          dateoftraining?: string | null
          designation?: string | null
          empideid?: string | null
          id?: number
          internalexternal?: string | null
          name?: string | null
          noofattendees?: number | null
          score?: number | null
          srno?: number | null
          trainingcertificatevalidity?: string | null
          trainingcoursetitle?: string | null
          trainingdurationhrs?: number | null
          traininghours?: number | null
          trainingprovider?: string | null
        }
        Update: {
          certificatereference?: string | null
          company?: string | null
          dateoftraining?: string | null
          designation?: string | null
          empideid?: string | null
          id?: number
          internalexternal?: string | null
          name?: string | null
          noofattendees?: number | null
          score?: number | null
          srno?: number | null
          trainingcertificatevalidity?: string | null
          trainingcoursetitle?: string | null
          trainingdurationhrs?: number | null
          traininghours?: number | null
          trainingprovider?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      execute_sql: {
        Args: { sql_query: string }
        Returns: undefined
      }
      get_table_columns: {
        Args: { table_name: string }
        Returns: {
          name: string
          nullable: boolean
          type: string
        }[]
      }
    }
    Enums: {
      incident_severity: "low" | "medium" | "high" | "critical"
      incident_type:
        | "near_miss"
        | "accident"
        | "injury"
        | "environmental"
        | "property_damage"
      inspection_status: "open" | "in_progress" | "completed" | "overdue"
      user_role: "admin" | "hse_officer" | "site_manager" | "worker"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      incident_severity: ["low", "medium", "high", "critical"],
      incident_type: [
        "near_miss",
        "accident",
        "injury",
        "environmental",
        "property_damage",
      ],
      inspection_status: ["open", "in_progress", "completed", "overdue"],
      user_role: ["admin", "hse_officer", "site_manager", "worker"],
    },
  },
} as const
