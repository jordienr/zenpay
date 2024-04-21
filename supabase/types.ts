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
      customers: {
        Row: {
          address: Json | null
          balance: number | null
          created: number | null
          currency: string | null
          default_source: string | null
          delinquent: boolean | null
          description: string | null
          discount: Json | null
          email: string | null
          id: string
          invoice_prefix: string | null
          invoice_settings: Json | null
          livemode: boolean | null
          metadata: Json | null
          name: string | null
          next_invoice_sequence: number | null
          object: string | null
          phone: string | null
          preferred_locales: Json | null
          project_id: string
          shipping: Json | null
          tax_exempt: string | null
          test_clock: string | null
        }
        Insert: {
          address?: Json | null
          balance?: number | null
          created?: number | null
          currency?: string | null
          default_source?: string | null
          delinquent?: boolean | null
          description?: string | null
          discount?: Json | null
          email?: string | null
          id: string
          invoice_prefix?: string | null
          invoice_settings?: Json | null
          livemode?: boolean | null
          metadata?: Json | null
          name?: string | null
          next_invoice_sequence?: number | null
          object?: string | null
          phone?: string | null
          preferred_locales?: Json | null
          project_id: string
          shipping?: Json | null
          tax_exempt?: string | null
          test_clock?: string | null
        }
        Update: {
          address?: Json | null
          balance?: number | null
          created?: number | null
          currency?: string | null
          default_source?: string | null
          delinquent?: boolean | null
          description?: string | null
          discount?: Json | null
          email?: string | null
          id?: string
          invoice_prefix?: string | null
          invoice_settings?: Json | null
          livemode?: boolean | null
          metadata?: Json | null
          name?: string | null
          next_invoice_sequence?: number | null
          object?: string | null
          phone?: string | null
          preferred_locales?: Json | null
          project_id?: string
          shipping?: Json | null
          tax_exempt?: string | null
          test_clock?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_customers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          billing_scheme: string | null
          created: number | null
          currency: string | null
          id: string
          livemode: boolean | null
          lookup_key: string | null
          metadata: Json | null
          nickname: string | null
          object: string | null
          product: string | null
          project_id: string
          recurring: Json | null
          tiers_mode: "graduated" | "volume" | null
          transform_quantity: Json | null
          type: "one_time" | "recurring" | null
          unit_amount: number | null
          unit_amount_decimal: string | null
        }
        Insert: {
          active?: boolean | null
          billing_scheme?: string | null
          created?: number | null
          currency?: string | null
          id: string
          livemode?: boolean | null
          lookup_key?: string | null
          metadata?: Json | null
          nickname?: string | null
          object?: string | null
          product?: string | null
          project_id: string
          recurring?: Json | null
          tiers_mode?: "graduated" | "volume" | null
          transform_quantity?: Json | null
          type?: "one_time" | "recurring" | null
          unit_amount?: number | null
          unit_amount_decimal?: string | null
        }
        Update: {
          active?: boolean | null
          billing_scheme?: string | null
          created?: number | null
          currency?: string | null
          id?: string
          livemode?: boolean | null
          lookup_key?: string | null
          metadata?: Json | null
          nickname?: string | null
          object?: string | null
          product?: string | null
          project_id?: string
          recurring?: Json | null
          tiers_mode?: "graduated" | "volume" | null
          transform_quantity?: Json | null
          type?: "one_time" | "recurring" | null
          unit_amount?: number | null
          unit_amount_decimal?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_prices_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          attributes: string[] | null
          created: number | null
          default_price: string | null
          description: string | null
          id: string
          images: Json | null
          livemode: boolean | null
          marketing_features: Json[] | null
          metadata: Json | null
          name: string | null
          object: string | null
          package_dimensions: Json | null
          project_id: string
          shippable: boolean | null
          statement_descriptor: string | null
          tax_code: string | null
          type: string | null
          unit_label: string | null
          updated: number | null
          url: string | null
        }
        Insert: {
          active?: boolean | null
          attributes?: string[] | null
          created?: number | null
          default_price?: string | null
          description?: string | null
          id: string
          images?: Json | null
          livemode?: boolean | null
          marketing_features?: Json[] | null
          metadata?: Json | null
          name?: string | null
          object?: string | null
          package_dimensions?: Json | null
          project_id: string
          shippable?: boolean | null
          statement_descriptor?: string | null
          tax_code?: string | null
          type?: string | null
          unit_label?: string | null
          updated?: number | null
          url?: string | null
        }
        Update: {
          active?: boolean | null
          attributes?: string[] | null
          created?: number | null
          default_price?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          livemode?: boolean | null
          marketing_features?: Json[] | null
          metadata?: Json | null
          name?: string | null
          object?: string | null
          package_dimensions?: Json | null
          project_id?: string
          shippable?: boolean | null
          statement_descriptor?: string | null
          tax_code?: string | null
          type?: string | null
          unit_label?: string | null
          updated?: number | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_products_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          id: string
          name: string
          owner: string
          stripe_secret_key: string | null
          stripe_webhook_secret: string | null
          webhook_endpoint_added: boolean | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          owner?: string
          stripe_secret_key?: string | null
          stripe_webhook_secret?: string | null
          webhook_endpoint_added?: boolean | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner?: string
          stripe_secret_key?: string | null
          stripe_webhook_secret?: string | null
          webhook_endpoint_added?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "public_projects_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          application: string | null
          application_fee_percent: number | null
          automatic_tax: Json | null
          billing_cycle_anchor: number | null
          billing_cycle_anchor_config: Json | null
          billing_thresholds: Json | null
          cancel_at: number | null
          cancel_at_period_end: boolean | null
          canceled_at: number | null
          cancellation_details: Json | null
          collection_method: string | null
          created: number | null
          currency: string | null
          current_period_end: number | null
          current_period_start: number | null
          customer: string | null
          days_until_due: number | null
          default_payment_method: string | null
          default_source: string | null
          default_tax_rates: Json | null
          description: string | null
          discount: Json | null
          discounts: string[] | null
          ended_at: number | null
          id: string
          invoice_settings: Json | null
          items: Json | null
          latest_invoice: string | null
          livemode: boolean | null
          metadata: Json | null
          next_pending_invoice_item_invoice: number | null
          object: string | null
          on_behalf_of: string | null
          pause_collection: Json | null
          payment_settings: Json | null
          pending_invoice_item_interval: Json | null
          pending_setup_intent: string | null
          pending_update: Json | null
          plan: string | null
          project_id: string
          quantity: number | null
          schedule: string | null
          start_date: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          test_clock: string | null
          transfer_data: Json | null
          trial_end: Json | null
          trial_settings: Json | null
          trial_start: Json | null
        }
        Insert: {
          application?: string | null
          application_fee_percent?: number | null
          automatic_tax?: Json | null
          billing_cycle_anchor?: number | null
          billing_cycle_anchor_config?: Json | null
          billing_thresholds?: Json | null
          cancel_at?: number | null
          cancel_at_period_end?: boolean | null
          canceled_at?: number | null
          cancellation_details?: Json | null
          collection_method?: string | null
          created?: number | null
          currency?: string | null
          current_period_end?: number | null
          current_period_start?: number | null
          customer?: string | null
          days_until_due?: number | null
          default_payment_method?: string | null
          default_source?: string | null
          default_tax_rates?: Json | null
          description?: string | null
          discount?: Json | null
          discounts?: string[] | null
          ended_at?: number | null
          id: string
          invoice_settings?: Json | null
          items?: Json | null
          latest_invoice?: string | null
          livemode?: boolean | null
          metadata?: Json | null
          next_pending_invoice_item_invoice?: number | null
          object?: string | null
          on_behalf_of?: string | null
          pause_collection?: Json | null
          payment_settings?: Json | null
          pending_invoice_item_interval?: Json | null
          pending_setup_intent?: string | null
          pending_update?: Json | null
          plan?: string | null
          project_id: string
          quantity?: number | null
          schedule?: string | null
          start_date?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          test_clock?: string | null
          transfer_data?: Json | null
          trial_end?: Json | null
          trial_settings?: Json | null
          trial_start?: Json | null
        }
        Update: {
          application?: string | null
          application_fee_percent?: number | null
          automatic_tax?: Json | null
          billing_cycle_anchor?: number | null
          billing_cycle_anchor_config?: Json | null
          billing_thresholds?: Json | null
          cancel_at?: number | null
          cancel_at_period_end?: boolean | null
          canceled_at?: number | null
          cancellation_details?: Json | null
          collection_method?: string | null
          created?: number | null
          currency?: string | null
          current_period_end?: number | null
          current_period_start?: number | null
          customer?: string | null
          days_until_due?: number | null
          default_payment_method?: string | null
          default_source?: string | null
          default_tax_rates?: Json | null
          description?: string | null
          discount?: Json | null
          discounts?: string[] | null
          ended_at?: number | null
          id?: string
          invoice_settings?: Json | null
          items?: Json | null
          latest_invoice?: string | null
          livemode?: boolean | null
          metadata?: Json | null
          next_pending_invoice_item_invoice?: number | null
          object?: string | null
          on_behalf_of?: string | null
          pause_collection?: Json | null
          payment_settings?: Json | null
          pending_invoice_item_interval?: Json | null
          pending_setup_intent?: string | null
          pending_update?: Json | null
          plan?: string | null
          project_id?: string
          quantity?: number | null
          schedule?: string | null
          start_date?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          test_clock?: string | null
          transfer_data?: Json | null
          trial_end?: Json | null
          trial_settings?: Json | null
          trial_start?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "public_subscriptions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_customer_fkey"
            columns: ["customer"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
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
