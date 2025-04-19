
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "The mentorship program helped me navigate my early career and land my dream job. The advice I received was invaluable.",
    author: "Priya Sharma",
    role: "Software Engineer, Google",
    avatar: "/placeholder.svg",
    initials: "PS",
  },
  {
    quote: "As an alumnus, giving back to the student community has been rewarding. I've made meaningful connections and helped shape future professionals.",
    author: "Rahul Joshi",
    role: "Senior Product Manager, Amazon",
    avatar: "/placeholder.svg",
    initials: "RJ",
  },
  {
    quote: "The forum discussions exposed me to real-world challenges and solutions I wouldn't have encountered in the classroom.",
    author: "Ananya Patel",
    role: "Data Scientist, Microsoft",
    avatar: "/placeholder.svg",
    initials: "AP",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-navy-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Hear from students and alumni who have benefited from our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="pt-6">
                <div className="relative">
                  <svg className="absolute -top-6 -left-2 h-12 w-12 text-gray-200 dark:text-gray-700" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="relative text-lg text-gray-700 dark:text-gray-300">
                    {testimonial.quote}
                  </p>
                </div>
                <div className="mt-6 flex items-center">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="text-base font-medium">{testimonial.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
