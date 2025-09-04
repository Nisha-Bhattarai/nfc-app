// TermsScreen.tsx
import React from "react";
import { ScrollView, View, Text, StyleSheet, Pressable, Linking, Platform } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // or any icon library
import { useNavigation } from "@react-navigation/native";

const APP_NAME = "NFC Business Card Management System";
const COMPANY_NAME = "Captain Printworks";
const SUPPORT_EMAIL = "webmaster@captainprint.com";
const PROVINCE = "Ontario"; 
const TERMS_VERSION = "1.0.0";
const LAST_UPDATED = "September 4, 2025";
const PRIVACY_URL = ""; 

export default function TermsScreen() {
    const navigation = useNavigation();
  const openPrivacy = () => {
    if (PRIVACY_URL) Linking.openURL(PRIVACY_URL);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#1f3a52" />
        </Pressable>
        <Text style={styles.title} marginTop="16">Terms & Conditions</Text>
        <Text style={styles.subtitle}>{APP_NAME}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Section title="1. Acceptance of Terms">
          <P>
            By creating an account or using {APP_NAME} (the “App”), you agree to be bound by these Terms & Conditions
            (“Terms”). If you do not agree, do not use the App.
          </P>
        </Section>

        <Section title="2. Eligibility">
          <P>You must be at least 18 years old and capable of entering into a binding agreement to create an account.</P>
        </Section>

        <Section title="3. Account Registration & Security">
          <BUL>
            <LI>Account creation requires a valid email address and one-time password (OTP) verification.</LI>
            <LI>You are responsible for maintaining the confidentiality of your login credentials.</LI>
            <LI>You agree to notify us immediately of any unauthorized use of your account.</LI>
            <LI>We are not liable for any loss resulting from unauthorized use of your account.</LI>
          </BUL>
        </Section>

        <Section title="4. Profiles & Content">
          <P>
            As an NFC Card Owner, you may create one or more profiles (e.g., Primary, Event) containing your
            information (name, image, address, social links, website, gallery, skills, certifications, events).
            You are solely responsible for the content you provide and must not upload illegal, harmful, or infringing
            material. You grant {COMPANY_NAME} a limited license to host and display your content solely to operate the App.
          </P>
        </Section>

        <Section title="5. NFC Links & Cards">
          <P>
            When you activate a profile, the App generates a unique URL that may be written to your NFC card. Scanning
            the card opens your active profile. You are responsible for keeping your active profile accurate and suitable
            for public viewing.
          </P>
        </Section>

        <Section title="6. Analytics">
          <P>
            When your NFC card is scanned, the App may collect basic analytics (e.g., scan time, device type, and
            city-level location) to display insights to you. Analytics are provided “as-is” and may be approximate.
            You agree not to misuse analytics or attempt to re-identify individuals from aggregated data.
          </P>
        </Section>

        <Section title="7. Contacts & Exchange Information">
          <BUL>
            <LI>
              If a scanner submits their contact information through the “Exchange Contact” form, their details will appear in your App’s Contacts section.
            </LI>
            <LI>
              You agree to use scanner information only for professional or networking purposes and not for unsolicited marketing, spam, or resale.
            </LI>
            <LI>You must comply with applicable privacy and anti-spam laws (e.g., Canada’s Anti-Spam Legislation, CASL) when contacting scanners.</LI>
          </BUL>
        </Section>

        <Section title="8. Acceptable Use">
          <BUL>
            <LI>Do not use the App for unlawful, harmful, or fraudulent activities.</LI>
            <LI>Do not attempt to access, probe, or disrupt any systems or networks.</LI>
            <LI>Do not impersonate others or misrepresent your identity or affiliations.</LI>
            <LI>Do not sell, sublicense, or exploit scanner data without consent.</LI>
          </BUL>
        </Section>

        <Section title="9. Intellectual Property">
          <P>
            {APP_NAME}, including its software, design, and trademarks, is owned by {COMPANY_NAME} and protected by law.
            Except as expressly permitted, you may not copy, modify, distribute, or create derivative works of the App.
          </P>
        </Section>

        <Section title="10. Third-Party Services">
          <P>
            The App may use third-party services (e.g., hosting, analytics) to provide functionality. Such providers act
            on our behalf and are bound by appropriate obligations. We are not responsible for third-party websites you
            choose to visit from your profile.
          </P>
        </Section>

        <Section title="11. Termination">
          <P>
            You may request to delete your account at any time. We may suspend or terminate your access if you violate these Terms
            or applicable laws, or if necessary to protect the App or its users.
          </P>
        </Section>

        <Section title="12. Disclaimers">
          <P>
            The App is provided on an “as-is” and “as-available” basis without warranties of any kind, express or
            implied. We do not warrant uninterrupted or error-free operation, or that analytics will be complete or
            accurate.
          </P>
        </Section>

        <Section title="13. Limitation of Liability">
          <P>
            To the fullest extent permitted by law, {COMPANY_NAME} will not be liable for indirect, incidental,
            consequential, special, or punitive damages, or any loss of data, profits, or goodwill arising from or
            related to your use of the App.
          </P>
        </Section>

        <Section title="14. Indemnity">
          <P>
            You agree to indemnify and hold harmless {COMPANY_NAME} from claims, damages, liabilities, costs, and
            expenses arising out of your content, your use of the App, or your violation of these Terms or applicable
            law.
          </P>
        </Section>

        <Section title="15. Changes to Terms">
          <P>
            We may update these Terms from time to time. Material changes will be indicated by updating the “Last
            Updated” date below. Your continued use of the App after changes constitutes acceptance of the updated Terms.
          </P>
        </Section>

        <Section title="16. Governing Law & Venue">
          <P>
            These Terms are governed by the laws of {PROVINCE}, Canada. You agree to the exclusive jurisdiction and
            venue of the courts located in {PROVINCE}, Canada, for any disputes arising out of or relating to these Terms
            or the App.
          </P>
        </Section>

        <Section title="17. Contact">
          <P>
            Questions? Contact us at{" "}
            <Pressable onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}`)}>
              <Text style={styles.link}>{SUPPORT_EMAIL}</Text>
            </Pressable>
            {PRIVACY_URL ? (
              <>
                {" "}
                or review our{" "}
                <Pressable onPress={openPrivacy}>
                  <Text style={styles.link}>Privacy Policy</Text>
                </Pressable>
                .
              </>
            ) : (
              "."
            )}
          </P>
        </Section>

        <View style={styles.footerMeta}>
          <Text style={styles.metaText}>Version {TERMS_VERSION}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText}>Last Updated: {LAST_UPDATED}</Text>
          {Platform.OS === "ios" || Platform.OS === "android" ? null : null}
        </View>
      </ScrollView>
    </View>
  );
}

// Small helpers for layout/semantics (JS version)

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={{ marginTop: 6 }}>{children}</View>
    </View>
  );
}

function P({ children }) {
  return <Text style={styles.paragraph}>{children}</Text>;
}

function BUL({ children }) {
  return <View style={{ /* avoid gap on older RN */ }}>{children}</View>;
}

function LI({ children }) {
  return (
    <View style={styles.liRow}>
      <Text style={styles.liBullet}>•</Text>
      <Text style={styles.liText}>{children}</Text>
    </View>
  );
}


/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  title: { fontSize: 20, fontWeight: "700", letterSpacing: 0.3, marginBottom: 2 },
  subtitle: { fontSize: 13, color: "#6b7280" },

  content: { padding: 16, paddingBottom: 24 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: "700" },
  paragraph: { fontSize: 14, lineHeight: 20, color: "#111827" },

  liRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  liBullet: { fontSize: 14, lineHeight: 20 },
  liText: { flex: 1, fontSize: 14, lineHeight: 20, color: "#111827" },

  link: { color: "#1f3a52", textDecorationLine: "underline" },

  footerMeta: {
    marginTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e5e7eb",
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaText: { fontSize: 12, color: "#6b7280" },
  metaDot: { fontSize: 12, color: "#9ca3af" },
});
