export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      investors: {
        Row: {
          created_at: string
          email: string
          id: string
          investment_focus: string | null
          investment_range: string | null
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          investment_focus?: string | null
          investment_range?: string | null
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          investment_focus?: string | null
          investment_range?: string | null
          name?: string
        }
        Relationships: []
      }
      startups: {
        Row: {
          created_at: string
          description: string | null
          document_path: string | null
          exit_strategy: string | null
          founded_date: string | null
          founders: string | null
          funding_required: string | null
          id: string
          industry: string | null
          key_metrics: string | null
          name: string
          previous_funding: string | null
          problem_solved: string | null
          roadmap: string | null
          stage: string | null
          target_market: string | null
          team_size: string | null
          traction: string | null
          use_of_funds: string | null
          usp: string | null
          valuation: string | null
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          document_path?: string | null
          exit_strategy?: string | null
          founded_date?: string | null
          founders?: string | null
          funding_required?: string | null
          id?: string
          industry?: string | null
          key_metrics?: string | null
          name: string
          previous_funding?: string | null
          problem_solved?: string | null
          roadmap?: string | null
          stage?: string | null
          target_market?: string | null
          team_size?: string | null
          traction?: string | null
          use_of_funds?: string | null
          usp?: string | null
          valuation?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          document_path?: string | null
          exit_strategy?: string | null
          founded_date?: string | null
          founders?: string | null
          funding_required?: string | null
          id?: string
          industry?: string | null
          key_metrics?: string | null
          name?: string
          previous_funding?: string | null
          problem_solved?: string | null
          roadmap?: string | null
          stage?: string | null
          target_market?: string | null
          team_size?: string | null
          traction?: string | null
          use_of_funds?: string | null
          usp?: string | null
          valuation?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
