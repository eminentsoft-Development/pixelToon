"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import slugify from "slugify";
import {
  Save,
  Plus,
  Trash2,
  Search,
  GraduationCap,
  HelpCircle,
  CheckCircle,
  Star,
  Wand2,
  BookOpen,
  Layers,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUpload from "@/components/admin/ImageUpload";
import { cn } from "@/lib/utils";

// ─── Schema ──────────────────────────────────────────────────────────────────
const formSchema = z.object({
  title: z.string().min(5, "Course title must be at least 5 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  description: z
    .string()
    .min(10, "Short summary must be at least 10 characters"),
  images: z
    .array(z.object({ url: z.string(), alt: z.string() }))
    .min(1, "At least one course image is required"),
  content: z
    .string()
    .min(20, "Detailed curriculum must be at least 20 characters"),
  whyThisCourse: z.array(z.object({ value: z.string().optional() })),
  acquireItems: z.array(z.object({ value: z.string().optional() })),
  curriculum: z.array(z.object({ value: z.string().optional() })),
  bonus: z.array(z.object({ value: z.string().optional() })),
  projects: z.array(z.object({ value: z.string().optional() })),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  metaTitle: z.string().min(5, "Meta title must be at least 5 characters"),
  metaDescription: z
    .string()
    .min(10, "Meta description must be at least 10 characters"),
  canonicalUrl: z
    .string()
    .url("Must be a valid URL (include https://)")
    .optional()
    .or(z.literal("")),
  metaKeywords: z.string().optional().or(z.literal("")),
});

const labelCn = (error, extra = "") =>
  cn("text-sm font-medium", error ? "text-red-500" : "text-slate-700", extra);

const inputCn = (error, extra = "") =>
  cn(
    "focus-visible:ring-1",
    error
      ? "border-red-400 focus-visible:ring-red-400"
      : "border-slate-200 focus-visible:ring-slate-400",
    extra,
  );

/** Red asterisk for required fields */
const Req = () => <span className="text-red-500 ml-0.5">*</span>;

const SectionHeader = ({ icon: Icon, iconColor, title, action }) => (
  <CardHeader className="flex flex-row items-center justify-between pb-4">
    <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2.5">
      <span className={`p-1.5 rounded-md bg-slate-100 ${iconColor}`}>
        <Icon size={16} />
      </span>
      {title}
    </CardTitle>
    {action}
  </CardHeader>
);

// ─── Dynamic Field Row ────────────────────────────────────────────────────────
const DynamicFieldRow = ({ control, name, placeholder, onRemove }) => (
  <div className="flex gap-2 items-start">
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="flex-1">
          <FormControl>
            <Input
              placeholder={placeholder}
              className={inputCn(fieldState.error, "h-9 text-sm bg-white")}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onRemove}
      className="h-9 w-9 text-slate-300 hover:text-red-500 hover:bg-red-50 shrink-0 transition-colors"
    >
      <Trash2 size={15} />
    </Button>
  </div>
);

// ─── Add Button ───────────────────────────────────────────────────────────────
const AddButton = ({ onClick, label }) => (
  <Button
    type="button"
    variant="outline"
    size="sm"
    onClick={onClick}
    className="h-8 text-xs gap-1.5 border-dashed border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-50"
  >
    <Plus size={13} />
    {label}
  </Button>
);

// ─── CourseForm ───────────────────────────────────────────────────────────────
const CourseForm = ({ onSubmit, loading, initialData }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      description: "",
      images: [],
      content: "",
      whyThisCourse: [{ value: "" }],
      acquireItems: [{ value: "" }],
      curriculum: [{ value: "" }],
      bonus: [{ value: "" }],
      projects: [{ value: "" }],
      isPublished: false,
      isFeatured: false,
      metaTitle: "",
      metaDescription: "",
      canonicalUrl: "https://pixeltoonzacademy.com/courses/",
      metaKeywords: "",
    },
  });

  const {
    fields: whyFields,
    append: appendWhy,
    remove: removeWhy,
  } = useFieldArray({ control: form.control, name: "whyThisCourse" });
  const {
    fields: acquireFields,
    append: appendAcquire,
    remove: removeAcquire,
  } = useFieldArray({ control: form.control, name: "acquireItems" });

  const {
    fields: curriculumFields,
    append: appendCurriculum,
    remove: removeCurriculum,
  } = useFieldArray({ control: form.control, name: "curriculum" });

  const {
    fields: bonusFields,
    append: appendBonus,
    remove: removeBonus,
  } = useFieldArray({ control: form.control, name: "bonus" });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({ control: form.control, name: "projects" });

  const generateSlug = () => {
    const title = form.getValues("title");
    if (title) {
      const slug = slugify(title, { lower: true, strict: true });
      form.setValue("slug", slug, { shouldValidate: true });
      form.setValue(
        "canonicalUrl",
        `https://pixeltoonzacademy.com/courses/${slug}`,
        { shouldValidate: true },
      );
    }
  };

  const errors = form.formState.errors;
  const hasErrors = Object.keys(errors).length > 0;
  const onInvalid = (errs) => console.error("Validation failed:", errs);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* ── Validation Summary Alert ── */}
        {hasErrors && (
          <div className="lg:col-span-12">
            <Alert
              variant="destructive"
              className="border-red-200 flex items-center bg-red-50"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm mt-1.5 text-red-700">
                Please fix the highlighted errors before saving. All required
                fields must be completed.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* ════════════════════ LEFT — Main Content ════════════════════ */}
        <div className="lg:col-span-8 space-y-5">
          {/* ── Course Overview ── */}
          <Card className="border border-slate-200 shadow-none rounded-xl overflow-hidden">
            <SectionHeader
              icon={BookOpen}
              iconColor="text-slate-600"
              title="Course Overview"
            />
            <CardContent className="space-y-5 pt-0">
              <FormField
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className={labelCn(fieldState.error)}>
                      Course Title
                      <Req />
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Integrated Diploma in Graphic Design"
                        className={inputCn(fieldState.error, "h-10 text-sm")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-end gap-2">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex-1">
                      <FormLabel className={labelCn(fieldState.error)}>
                        URL Slug
                        <Req />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="integrated-diploma-graphic-design"
                          className={inputCn(
                            fieldState.error,
                            "h-10 text-sm font-mono",
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  onClick={generateSlug}
                  className="h-10 gap-1.5 text-sm bg-slate-800 hover:bg-slate-700 text-white"
                >
                  <Wand2 size={14} /> Generate
                </Button>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className={labelCn(fieldState.error)}>
                      Short Summary
                      <Req />
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly describe what students will gain..."
                        rows={3}
                        className={inputCn(
                          fieldState.error,
                          "text-sm resize-none",
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="images"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className={labelCn(fieldState.error)}>
                      Course Images
                      <Req />
                    </FormLabel>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      multiple
                      maxImages={4}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className={labelCn(fieldState.error)}>
                      Detailed Curriculum
                      <Req />
                    </FormLabel>
                    <FormControl>
                      <RichTextEditor
                        content={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* ── Acquire ── */}
          <Card className="border border-slate-200 shadow-none rounded-xl overflow-hidden">
            <SectionHeader
              icon={GraduationCap}
              iconColor="text-indigo-600"
              title="What You Will Acquire"
              action={
                <AddButton
                  onClick={() => appendAcquire({ value: "" })}
                  label="Add Skill"
                />
              }
            />
            <CardContent className="space-y-3 pt-0">
              {acquireFields.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-3">
                  No skills added yet.
                </p>
              )}
              {acquireFields.map((field, index) => (
                <DynamicFieldRow
                  key={field.id}
                  control={form.control}
                  name={`acquireItems.${index}.value`}
                  placeholder="e.g. Mastery of Adobe Creative Suite"
                  onRemove={() => removeAcquire(index)}
                />
              ))}
            </CardContent>
          </Card>

          {/* ── Why This Course ── */}
          <Card className="border border-slate-200 shadow-none rounded-xl overflow-hidden">
            <SectionHeader
              icon={CheckCircle}
              iconColor="text-green-600"
              title="Why This Course?"
              action={
                <AddButton
                  onClick={() => appendWhy({ value: "" })}
                  label="Add Reason"
                />
              }
            />
            <CardContent className="space-y-3 pt-0">
              {whyFields.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-3">
                  No reasons added yet.
                </p>
              )}
              {whyFields.map((field, index) => (
                <DynamicFieldRow
                  key={field.id}
                  control={form.control}
                  name={`whyThisCourse.${index}.value`}
                  placeholder="e.g. Industry-leading mentors"
                  onRemove={() => removeWhy(index)}
                />
              ))}
            </CardContent>
          </Card>

          {/* ── Curriculum ── */}
          <Card className="border border-slate-200 shadow-none rounded-xl overflow-hidden">
            <SectionHeader
              icon={Layers}
              iconColor="text-orange-600"
              title="Course Curriculum"
              action={
                <AddButton
                  onClick={() => appendCurriculum({ value: "" })}
                  label="Add Module"
                />
              }
            />
            <CardContent className="space-y-3 pt-0">
              {curriculumFields.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-3">
                  No modules added.
                </p>
              )}
              {curriculumFields.map((field, index) => (
                <DynamicFieldRow
                  key={field.id}
                  control={form.control}
                  name={`curriculum.${index}.value`}
                  placeholder="e.g. Introduction to Digital Marketing"
                  onRemove={() => removeCurriculum(index)}
                />
              ))}
            </CardContent>
          </Card>

          {/* ── Bonus Modules ── */}
          <Card className="border border-slate-200 shadow-none rounded-xl overflow-hidden">
            <SectionHeader
              icon={Plus}
              iconColor="text-emerald-600"
              title="Bonus Modules"
              action={
                <AddButton
                  onClick={() => appendBonus({ value: "" })}
                  label="Add Bonus"
                />
              }
            />
            <CardContent className="space-y-3 pt-0">
              {bonusFields.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-3">
                  No bonus items.
                </p>
              )}
              {bonusFields.map((field, index) => (
                <DynamicFieldRow
                  key={field.id}
                  control={form.control}
                  name={`bonus.${index}.value`}
                  placeholder="e.g. AI Tools for Marketers"
                  onRemove={() => removeBonus(index)}
                />
              ))}
            </CardContent>
          </Card>

          {/* ── Capstone Projects ── */}
          <Card className="border border-slate-200 shadow-none rounded-xl overflow-hidden">
            <SectionHeader
              icon={Star}
              iconColor="text-yellow-600"
              title="Capstone Projects"
              action={
                <AddButton
                  onClick={() => appendProject({ value: "" })}
                  label="Add Project Step"
                />
              }
            />
            <CardContent className="space-y-3 pt-0">
              {projectFields.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-3">
                  No projects added.
                </p>
              )}
              {projectFields.map((field, index) => (
                <DynamicFieldRow
                  key={field.id}
                  control={form.control}
                  name={`projects.${index}.value`}
                  placeholder="e.g. Run a live Facebook campaign"
                  onRemove={() => removeProject(index)}
                />
              ))}
            </CardContent>
          </Card>

          {/* ── SEO Settings ── */}
          <Card className="border border-slate-200 shadow-none rounded-xl overflow-hidden">
            <SectionHeader
              icon={Search}
              iconColor="text-sky-600"
              title="SEO Settings"
            />
            <CardContent className="space-y-5 pt-0">
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className={labelCn(fieldState.error)}>
                      Meta Title
                      <Req />
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Graphic Design Diploma | Pixeltoonz Academy"
                        className={inputCn(fieldState.error, "h-10 text-sm")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="canonicalUrl"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className={labelCn(fieldState.error)}>
                      Canonical URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={inputCn(
                          fieldState.error,
                          "h-10 text-sm font-mono",
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className={labelCn(fieldState.error)}>
                      Meta Description
                      <Req />
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A concise summary for search engines (150–160 chars recommended)..."
                        rows={3}
                        className={inputCn(
                          fieldState.error,
                          "text-sm resize-none",
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metaKeywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Meta Keywords
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="graphic design, adobe, diploma, animation..."
                        className="h-10 text-sm border-slate-200 focus-visible:ring-1 focus-visible:ring-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-slate-400">
                      Comma-separated keywords (optional but recommended)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* ════════════════════ RIGHT — Sidebar ════════════════════ */}
        <div className="lg:col-span-4">
          <div className="sticky top-6 space-y-5">
            <Card className="border border-slate-200 shadow-none rounded-xl overflow-hidden">
              <CardContent className="p-5 space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    Publishing
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Control visibility and promotion
                  </p>
                </div>
                <Separator className="bg-slate-100" />

                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border border-slate-100 bg-slate-50 p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-slate-300 data-[state=checked]:bg-slate-800 data-[state=checked]:border-slate-800"
                        />
                      </FormControl>
                      <div className="space-y-0.5 leading-none">
                        <FormLabel className="text-sm font-medium text-slate-700 cursor-pointer">
                          Published
                        </FormLabel>
                        <FormDescription className="text-[11px] text-slate-400">
                          Visible on the website
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border border-slate-100 bg-slate-50 p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-slate-300 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                        />
                      </FormControl>
                      <div className="space-y-0.5 leading-none">
                        <FormLabel className="text-sm font-medium text-slate-700 cursor-pointer flex items-center gap-1.5">
                          Featured{" "}
                          <Star
                            size={11}
                            className="fill-amber-400 text-amber-400"
                          />
                        </FormLabel>
                        <FormDescription className="text-[11px] text-slate-400">
                          Highlighted in home sliders
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full gap-2 h-10 text-sm font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors"
                >
                  <Save size={15} />
                  {loading
                    ? "Saving…"
                    : initialData
                      ? "Update Course"
                      : "Save Course"}
                </Button>

                {hasErrors && (
                  <p className="text-xs text-red-500 text-center">
                    Fix all errors above before saving.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-none rounded-xl overflow-hidden bg-slate-50">
              <CardContent className="p-5">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                  Tips
                </h4>
                <ul className="space-y-2 text-xs text-slate-500">
                  {[
                    <>
                      <strong className="text-slate-600">Generate</strong>{" "}
                      auto-creates a slug from the title.
                    </>,
                    "Meta description: 150–160 characters is optimal for SEO.",
                    "At least one image is required before publishing.",
                    "Featured courses appear in the homepage slider.",
                  ].map((tip, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-slate-300 shrink-0">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CourseForm;
