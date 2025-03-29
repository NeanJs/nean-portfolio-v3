import { useState, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Github,
  Facebook,
  X,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useGetUserInfoQuery } from "@/lib/services/api";
import { IconMap } from "./ui/IconMap";

const ContactInfo = ({
  icon: Icon,
  title,
  content,
  href,
}: {
  icon: React.ElementType;
  title: string;
  content: string;
  href: string;
}) => (
  <a
    href={href}
    className="flex items-start space-x-4 p-4 rounded-lg border border-border transition-colors hover:bg-secondary/50"
  >
    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground">{content}</p>
    </div>
  </a>
);

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: userData, error, isLoading } = useGetUserInfoQuery({});
  const [contactInfo, setContactInfo] = useState(null);
  useEffect(() => {
    if (userData && userData.length > 0) {
      setContactInfo({
        mail: userData[0]?.userInfo?.text_blocks?.mail,
        phone: userData[0]?.userInfo?.text_blocks?.phone,
        location: userData[0]?.userInfo?.text_blocks?.location,
        social_blocks: userData[0]?.social_blocks,
      });
    }
  }, [userData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success notification
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      // Error notification
      toast({
        title: "Something went wrong!",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="glow right-1/4 top-1/3"></div>

      <div className="text-center mb-16 max-w-2xl mx-auto">
        <div className="chip mb-3">Contact</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
        <p className="text-muted-foreground">
          Have a question or want to work together? Fill out the form below or
          use the contact information provided.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <ContactInfo
              icon={Mail}
              title="Email"
              content={contactInfo?.mail}
              href={`mailto:${contactInfo?.mail}`}
            />
            <ContactInfo
              icon={Phone}
              title="Phone"
              content={contactInfo?.phone}
              href={`tel:${contactInfo?.phone}`}
            />
            <ContactInfo
              icon={MapPin}
              title="Location"
              content={contactInfo?.location}
              href="https://maps.google.com"
            />
          </div>

          <div className="p-6 rounded-xl border border-border bg-card/50">
            <h4 className="text-lg font-medium mb-3">
              I’m Here When <span className="text-green-600"> You Need Me</span>{" "}
              🕒
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              No fixed hours, just availability! 🕔 If you want to talk tech ⚙️,
              projects 🚀, or ideas 💡, I’m just a message 📩 away!
            </p>
            {contactInfo?.social_blocks?.map((social, index) => {
              return (
                <a
                  key={index}
                  href={social.href}
                  className="inline-block mr-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {IconMap[social.name]}
                </a>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                placeholder="What is this regarding?"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message here..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full min-h-[150px]"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>Sending...</>
              ) : (
                <>
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
